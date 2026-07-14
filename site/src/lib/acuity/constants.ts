/**
 * Acuity scheduling constants + URL builders.
 *
 * Single source of truth so we don't have `owner=38274584` scattered everywhere.
 */

export const ACUITY_OWNER_ID = '38274584';

export const ACUITY_APP_ORIGIN = 'https://app.acuityscheduling.com';
export const ACUITY_SCHEDULE_PATH = '/schedule.php';

export const ACUITY_BASE_SCHEDULE_URL = `${ACUITY_APP_ORIGIN}${ACUITY_SCHEDULE_PATH}?owner=${ACUITY_OWNER_ID}`;

export const ACUITY_EMBED_ORIGIN = 'https://embed.acuityscheduling.com';
export const ACUITY_EMBED_JS_URL = `${ACUITY_EMBED_ORIGIN}/js/embed.js`;

/**
 * Public appointment types approved for website booking.
 *
 * Acuity's supported repeated `appointmentType[]` parameter limits a scheduler
 * to this allowlist. Keep this list in sync when appointment types change.
 * Last audited against the public scheduler: 2026-07-14.
 */
export const PUBLIC_APPOINTMENT_TYPE_IDS = [
  // Alyssa Color
  88812877, 88812883, 88812896, 88812902, 88812909, 88812920, 88812943,
  // Alyssa Extensions
  88812990, 88812994, 88812999,
  // Alyssa Haircuts
  88812948, 88812961,
  // Alyssa Lightening
  88812827, 88812830, 88812836, 88812842, 88812849, 88812852, 88812938, 89912491,
  // Alyssa Treatments
  88812974, 88812983,
  // Color
  88812693, 88812719, 88812724, 88812732, 88812738, 88812748, 88812750,
  // Extras
  88812797, 88812805, 88812815, 88812820,
  // Haircuts
  88702235, 88812396, 88812446, 88812623, 88818521,
] as const;

const PUBLIC_EXTRA_APPOINTMENT_TYPE_IDS = [88812797, 88812805, 88812815, 88812820] as const;

function acuityBookingUrlForAppointmentTypes(
  appointmentTypeIds: readonly number[],
  calendarId?: number | string
): string {
  const appointmentTypes = appointmentTypeIds
    .map((id) => `appointmentType[]=${id}`)
    .join('&');
  const calendar = calendarId ? `&calendarID=${encodeURIComponent(String(calendarId))}` : '';

  return `${ACUITY_BASE_SCHEDULE_URL}&${appointmentTypes}${calendar}`;
}

export function acuityBookingUrlForCalendar(calendarId: number | string): string {
  return acuityBookingUrlForAppointmentTypes(PUBLIC_APPOINTMENT_TYPE_IDS, calendarId);
}

export function acuityBookingUrlForAppointmentType(appointmentTypeId: number | string): string {
  return `${ACUITY_BASE_SCHEDULE_URL}&appointmentType=${appointmentTypeId}`;
}

export function acuityBookingUrlForCategory(categoryName: string): string {
  // The broader Extras category contains a retired service in Acuity. Use an
  // explicit allowlist until the account owner removes it in Acuity admin.
  if (categoryName.trim().toLowerCase() === 'extras') {
    return acuityBookingUrlForAppointmentTypes(PUBLIC_EXTRA_APPOINTMENT_TYPE_IDS);
  }

  // Keep the `category:` prefix readable; encode only the category text.
  return `${ACUITY_BASE_SCHEDULE_URL}&appointmentType=category:${encodeURIComponent(categoryName)}`;
}

export const ACUITY_EMBED_BASE_URL = `${acuityBookingUrlForAppointmentTypes(PUBLIC_APPOINTMENT_TYPE_IDS)}&showHeader=false`;
