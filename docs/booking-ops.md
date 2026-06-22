# Booking Ops Runbook (Acuity)

Use this when there is any risk of a missed appointment, especially during migrations.

## 1) Standard Response Template (Text/Email)

**Goal:** acknowledge, take ownership, ask for the minimum info needed, and commit to a concrete next step/time.

Copy/paste and fill brackets:

> Thanks for flagging this. I agree we need to make sure nothing is getting missed.
> 
> 1. I’m going to pull an audit of Alyssa’s booked appointments on our side for **[DATE RANGE]** and send you a list of anything that looks unexpected.
> 2. For the **[TIME]** today: can you send me the client’s **name** and the **email or phone** they used to book (if you have it)? I’ll look up the booking record and confirm **exactly when/how it was created** (client booking vs admin booking) so we can prevent repeats.
> 3. On the block-time conversions: **please don’t delete any of those yet**. Deleting risks losing contact details. We’ll export/capture the client info first, then recreate them as proper appointments so reminders work.
> 
> I’ll get you the audit list by **[TIME TODAY]**.

## 2) Immediate “Stop The Bleed” Checklist

Do these in order.

0. SMS reminder incident triage.
   - Acuity now requires an explicit **per-appointment SMS opt-in**. A client can have a phone number on the appointment and still not receive a text if they or the admin did not opt in for that exact booking.
   - Client confirmations are email-only; Acuity sends at most one SMS reminder before the appointment.
   - On the public scheduler, tell clients to check the SMS reminder permission box under the email field if they want a text reminder.
   - For appointments staff booked on a client’s behalf, staff must only check/restore SMS opt-in after the client has given permission.

1. Confirm staff notifications are configured.
   - In Acuity admin: verify “New appointment” notifications go to the correct staff emails.
   - Do a test booking and ensure Virginia and Alyssa both receive the expected notification.

2. Audit upcoming appointments.
   - Pull upcoming appointments for each stylist for the next 14-30 days.
   - Specifically look for entries with missing contact info.
   - For SMS issues, separate online/client-booked appointments from admin-booked appointments. Admin-booked appointments are the highest-risk group for a missing SMS opt-in checkbox.

3. Freeze destructive edits.
   - No deleting appointments or block-offs until exports are captured.

## 2.1) SMS Reminder Recovery

Use this when clients say they are not receiving Acuity text reminders.

What to know:
- Text reminders are sent to the phone number on the appointment.
- Clients must opt in per appointment. There is no account-wide “always text this client” switch.
- If staff booked the appointment for the client, staff can edit the appointment and check the SMS opt-in box only after the client gives permission.
- Existing appointments with no phone number cannot receive Acuity SMS until the phone number is added.

Fast admin UI fix:

1. In Acuity, open **Calendar**.
2. Click the affected appointment.
3. Click **Edit**.
4. Confirm the appointment has a mobile phone number.
5. If the client gave permission, check the SMS reminder opt-in checkbox.
6. Click **Confirm changes**.

Fast API audit/remediation:

```bash
# From repo root. Load env from Vercel-pulled local env if available.
set -a
source site/.env.local
set +a

# Dry-run: next 30 days, admin-booked appointments only, no PII output.
node scripts/acuity-sms-remediation.mjs

# Apply only after staff confirms required SMS consent for those appointments.
node scripts/acuity-sms-remediation.mjs --apply --consent-confirmed
```

The script intentionally defaults to admin-booked appointments because online/client-booked appointments may have intentionally declined SMS. Add `--include-client-booked` only if consent has been separately confirmed for those appointments too.

## 3) How To Audit Appointments (Fast)

### Option A: Acuity UI export

1. In Acuity admin: Appointments
2. Filter the date range (start = today; end = +30 days)
3. Export CSV (or print list) for Virginia/Kim/Alyssa

### Option B: Local API audit script (recommended during migration)

This repo includes a local script that queries Acuity via API and outputs a list/CSV.

> Treat the output as sensitive client data. Don’t paste it into group chats; prefer sending a summary.
Calendar IDs:

- Virginia: `13484734`
- Kim: `13484780`
- Alyssa: `13484805`

1. Ensure env vars are set:

```bash
export ACUITY_USER_ID='38274584'
export ACUITY_API_KEY='your_api_key'
```

2. Run an audit (example: Alyssa, next 30 days):

```bash
node scripts/acuity-audit-appointments.mjs \
  --from 2026-02-08 \
  --to 2026-03-10 \
  --calendar 13484805 \
  --direction ASC \
  --csv output/alyssa-appointments.csv
```

3. If you need “who created this booking” data, add `--details` (slower):

```bash
node scripts/acuity-audit-appointments.mjs --from 2026-02-08 --to 2026-03-10 --calendar 13484805 --direction ASC --details
```

## 4) Block Time Conversion (Don’t Lose Contact Info)

Problem:
- “Block off time” entries do not behave like client appointments (no reminders).
- Deleting/overwriting entries can lose the only copy of client contact info.

Safe process:

1. Export first.
   - Export client list.
   - Export appointments for the affected date range.

2. Recreate second.
   - Recreate client appointments as actual appointment types (not block-offs).
   - Verify the client has email/phone on the appointment.
   - Verify reminders are enabled for that appointment type.

3. Delete last.
   - Only delete the old block-offs after verifying the replacement appointment exists and has contact info.

## 5) Migration Window Reconciliation

If someone says “I booked last week but you didn’t get notified”, treat it like a reconciliation issue:

1. Find the appointment by date/time + stylist calendar.
2. Check `dateCreated` and (if needed) `scheduledBy`.
3. If it was created during the migration window, assume notifications may not have been wired correctly yet.
4. After remediation: re-test with a fresh booking.
