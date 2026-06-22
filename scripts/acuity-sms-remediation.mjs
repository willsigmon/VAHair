#!/usr/bin/env node
/*
 * Acuity SMS opt-in remediation helper.
 *
 * Why this exists:
 * - Acuity now requires explicit SMS opt-in per appointment.
 * - Admin-booked appointments are easy to create with a phone number but without
 *   the SMS consent checkbox checked.
 * - The Acuity read API does not expose current smsOptIn status, so this script
 *   is intentionally conservative: dry-run by default, admin-booked only by
 *   default, and apply requires an explicit consent flag.
 *
 * Privacy: default output avoids names, email addresses, and full phone numbers.
 */

import { writeFileSync } from 'node:fs';

const ACUITY_BASE_URL = 'https://acuityscheduling.com/api/v1';

const CALENDAR_NAMES = {
  13484734: 'Virginia',
  13484780: 'Kim',
  13484805: 'Alyssa',
};

function usage(exitCode = 0) {
  const msg = `
Usage:
  node scripts/acuity-sms-remediation.mjs [options]

Env:
  ACUITY_USER_ID   (required)
  ACUITY_API_KEY   (required)

Options:
  --from YYYY-MM-DD           (default: today)
  --to YYYY-MM-DD             (default: today+30d)
  --calendar <id>             (repeatable; default: Virginia/Kim/Alyssa)
  --max <n>                   (default: 100 per calendar)
  --include-client-booked     also include online/client-booked appointments
  --apply                     update matching appointments with smsOptIn=true
  --consent-confirmed         required with --apply; confirms consent was obtained
  --csv <path>                write a privacy-safe CSV of candidates
  --show-ids                  print candidate appointment IDs in the terminal

Examples:
  # Dry-run the next 30 days, admin-booked appointments only:
  ACUITY_USER_ID=... ACUITY_API_KEY=... \\
    node scripts/acuity-sms-remediation.mjs

  # Apply only after staff confirms SMS consent for the target appointments:
  ACUITY_USER_ID=... ACUITY_API_KEY=... \\
    node scripts/acuity-sms-remediation.mjs --apply --consent-confirmed
`.trim();

  console.error(msg);
  process.exit(exitCode);
}

function parseArgs(argv) {
  const out = {
    from: null,
    to: null,
    calendars: [],
    max: 100,
    includeClientBooked: false,
    apply: false,
    consentConfirmed: false,
    csvPath: null,
    showIds: false,
  };

  const args = [...argv];
  while (args.length) {
    const a = args.shift();
    if (!a) break;

    if (a === '--help' || a === '-h') usage(0);
    else if (a === '--from') out.from = args.shift() ?? usage(2);
    else if (a === '--to') out.to = args.shift() ?? usage(2);
    else if (a === '--calendar') out.calendars.push(Number(args.shift() ?? usage(2)));
    else if (a === '--max') out.max = Number(args.shift() ?? usage(2));
    else if (a === '--include-client-booked') out.includeClientBooked = true;
    else if (a === '--apply') out.apply = true;
    else if (a === '--consent-confirmed') out.consentConfirmed = true;
    else if (a === '--csv') out.csvPath = args.shift() ?? usage(2);
    else if (a === '--show-ids') out.showIds = true;
    else {
      console.error(`Unknown arg: ${a}`);
      usage(2);
    }
  }

  if (!Number.isFinite(out.max) || out.max <= 0) {
    console.error('Invalid --max (must be a positive number)');
    process.exit(2);
  }
  if (out.calendars.some((id) => !Number.isFinite(id))) {
    console.error('Invalid --calendar id');
    process.exit(2);
  }
  if (out.apply && !out.consentConfirmed) {
    console.error(
      'Refusing to apply: pass --consent-confirmed only after staff has legally required SMS consent.'
    );
    process.exit(2);
  }

  return out;
}

function localISODate(d = new Date()) {
  const tzOffsetMs = d.getTimezoneOffset() * 60_000;
  const local = new Date(d.getTime() - tzOffsetMs);
  return local.toISOString().slice(0, 10);
}

function addDaysISODate(isoDate, days) {
  const [y, m, dd] = isoDate.split('-').map(Number);
  const d = new Date(y, m - 1, dd);
  d.setDate(d.getDate() + days);
  return localISODate(d);
}

function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing env var: ${name}`);
    process.exit(2);
  }
  return v;
}

function authHeader() {
  const userId = requireEnv('ACUITY_USER_ID');
  const apiKey = requireEnv('ACUITY_API_KEY');
  const token = Buffer.from(`${userId}:${apiKey}`, 'utf8').toString('base64');
  return `Basic ${token}`;
}

async function acuityGetJson(path, params) {
  const url = new URL(`${ACUITY_BASE_URL}${path}`);
  for (const [k, v] of Object.entries(params ?? {})) {
    if (v === null || v === undefined || v === '') continue;
    url.searchParams.set(k, String(v));
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: authHeader(),
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Acuity API ${res.status} ${res.statusText}: ${text.slice(0, 500)}`);
  }

  return res.json();
}

async function acuityPutJson(path, body) {
  const res = await fetch(`${ACUITY_BASE_URL}${path}`, {
    method: 'PUT',
    headers: {
      Authorization: authHeader(),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Acuity API ${res.status} ${res.statusText}: ${text.slice(0, 500)}`);
  }

  return res.json();
}

async function mapLimit(items, limit, fn) {
  const ret = new Array(items.length);
  let i = 0;

  async function worker() {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      ret[idx] = await fn(items[idx], idx);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
  await Promise.all(workers);
  return ret;
}

async function fetchAppointments({ from, to, calendarIDs, max }) {
  const all = [];
  for (const calendarID of calendarIDs) {
    const rows = await acuityGetJson('/appointments', {
      max,
      minDate: from,
      maxDate: to,
      calendarID,
      canceled: false,
      excludeForms: true,
      direction: 'ASC',
    });
    if (!Array.isArray(rows)) {
      throw new Error('Unexpected /appointments response (expected JSON array)');
    }
    all.push(...rows);
  }
  return all;
}

async function fetchAppointmentDetails(id) {
  return acuityGetJson(`/appointments/${encodeURIComponent(id)}`, { pastFormAnswers: false });
}

function csvEscape(value) {
  const s = value === null || value === undefined ? '' : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

function toCsv(rows, columns) {
  const header = columns.join(',');
  const lines = rows.map((r) => columns.map((c) => csvEscape(r[c])).join(','));
  return [header, ...lines].join('\n') + '\n';
}

function phoneLast4(phone) {
  const digits = String(phone ?? '').replace(/\D/g, '');
  return digits ? digits.slice(-4).padStart(Math.min(4, digits.length), '*') : '';
}

function summarize(rows, candidates) {
  const byCalendar = new Map();
  for (const row of rows) {
    const name = row.calendarName;
    const bucket = byCalendar.get(name) ?? {
      total: 0,
      missingPhone: 0,
      adminBooked: 0,
      clientBooked: 0,
      candidates: 0,
    };

    bucket.total++;
    if (!row.phonePresent) bucket.missingPhone++;
    if (row.bookingSource === 'admin') bucket.adminBooked++;
    else bucket.clientBooked++;
    byCalendar.set(name, bucket);
  }

  for (const row of candidates) {
    const bucket = byCalendar.get(row.calendarName);
    if (bucket) bucket.candidates++;
  }

  return Object.fromEntries([...byCalendar.entries()].sort((a, b) => a[0].localeCompare(b[0])));
}

function printHumanSummary({ from, to, rows, candidates, opts, applyResults }) {
  const totalMissingPhone = rows.filter((r) => !r.phonePresent).length;
  const adminBooked = rows.filter((r) => r.bookingSource === 'admin').length;
  const clientBooked = rows.length - adminBooked;

  console.log(`Range: ${from} → ${to}`);
  console.log(`Appointments scanned: ${rows.length}`);
  console.log(`Admin-booked: ${adminBooked}`);
  console.log(`Client/online-booked: ${clientBooked}`);
  console.log(`Missing phone (cannot receive Acuity SMS): ${totalMissingPhone}`);
  console.log(`Candidate appointments for smsOptIn=true: ${candidates.length}`);
  console.log('');
  console.log('By calendar:');
  console.table(summarize(rows, candidates));
  console.log(
    'Note: Acuity does not expose current smsOptIn on appointment reads; candidates are appointments with a phone number where we can safely target the admin-booked consent recovery path.'
  );

  if (opts.showIds && candidates.length) {
    console.log('');
    console.log(`Candidate IDs: ${candidates.map((r) => r.id).join(', ')}`);
  }

  if (!opts.apply) {
    console.log('');
    console.log('Dry run only. To apply after consent is confirmed:');
    console.log('  node scripts/acuity-sms-remediation.mjs --apply --consent-confirmed');
  } else {
    const ok = applyResults.filter((r) => r.ok).length;
    const failed = applyResults.length - ok;
    console.log('');
    console.log(`Applied smsOptIn=true: ${ok}`);
    console.log(`Failed updates: ${failed}`);
    if (failed) {
      console.log('Failed IDs:', applyResults.filter((r) => !r.ok).map((r) => r.id).join(', '));
    }
  }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const from = opts.from ?? localISODate(new Date());
  const to = opts.to ?? addDaysISODate(from, 30);
  const calendarIDs = opts.calendars.length ? opts.calendars : Object.keys(CALENDAR_NAMES).map(Number);

  const appointments = await fetchAppointments({
    from,
    to,
    calendarIDs,
    max: opts.max,
  });

  const rows = await mapLimit(appointments, 6, async (appointment) => {
    const detail = await fetchAppointmentDetails(appointment.id);
    const scheduledBy = detail?.scheduledBy ?? null;
    const phone = detail?.phone ?? appointment.phone ?? '';
    const bookingSource = scheduledBy ? 'admin' : 'client';

    return {
      id: appointment.id,
      datetime: appointment.datetime ?? '',
      dateCreated: appointment.dateCreated ?? appointment.datetimeCreated ?? '',
      calendarID: appointment.calendarID ?? '',
      calendarName: CALENDAR_NAMES[appointment.calendarID] ?? appointment.calendar ?? String(appointment.calendarID ?? ''),
      appointmentTypeID: appointment.appointmentTypeID ?? '',
      type: appointment.type ?? '',
      bookingSource,
      phonePresent: Boolean(String(phone).trim()),
      phoneLast4: phoneLast4(phone),
      scheduledByPresent: Boolean(scheduledBy),
    };
  });

  rows.sort((a, b) => String(a.datetime).localeCompare(String(b.datetime)) || Number(a.id) - Number(b.id));

  const candidates = rows.filter((row) => {
    if (!row.phonePresent) return false;
    if (row.bookingSource === 'admin') return true;
    return opts.includeClientBooked;
  });

  if (opts.csvPath) {
    const cols = [
      'id',
      'datetime',
      'dateCreated',
      'calendarID',
      'calendarName',
      'appointmentTypeID',
      'type',
      'bookingSource',
      'phonePresent',
      'phoneLast4',
    ];
    writeFileSync(opts.csvPath, toCsv(candidates, cols));
    console.log(`Wrote candidate CSV: ${opts.csvPath}`);
  }

  let applyResults = [];
  if (opts.apply) {
    applyResults = await mapLimit(candidates, 4, async (row) => {
      try {
        await acuityPutJson(`/appointments/${encodeURIComponent(row.id)}`, { smsOptIn: true });
        return { id: row.id, ok: true };
      } catch (error) {
        return { id: row.id, ok: false, error: error?.message ?? String(error) };
      }
    });
  }

  printHumanSummary({ from, to, rows, candidates, opts, applyResults });
}

main().catch((err) => {
  console.error(err?.stack || String(err));
  process.exit(1);
});
