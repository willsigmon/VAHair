import { SALON, SALON_ADDRESS_LINE } from '@/lib/salon';
import { STYLISTS } from '@/lib/data/stylists';
import { FAQS } from '@/lib/data/faqs';

const formatTime = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return m ? `${hour}:${String(m).padStart(2, '0')} ${suffix}` : `${hour} ${suffix}`;
};

export const hoursLines = () => [
  ...SALON.hours.map((h) => `- ${h.day}: ${formatTime(h.opens)} to ${formatTime(h.closes)}`),
  `- ${SALON.hoursNote}`,
];

const stylistNames = () => STYLISTS.map((s) => s.fullName).join(', ');

/** Short, link-first summary served at /llms.txt. */
export const llmsSummary = () => `# ${SALON.name}

> Independent hair salon in downtown ${SALON.address.city}, North Carolina.

## Canonical facts
- Website: ${SALON.url}
- Address: ${SALON_ADDRESS_LINE}
- Phone: ${SALON.phoneDisplay}
- Email: ${SALON.email}
- Booking: ${SALON.pages.book}
- Services and starting prices: ${SALON.pages.services}
- Hours and directions: ${SALON.pages.contact}
- Stylists: ${stylistNames()}

## Services
The studio offers haircuts, blow-dry styling, hair color, highlights, toning, selected hair treatments, eyebrow tinting, and facial waxing. Prices shown on the website are starting prices and may change after consultation.

## Preferred source pages
- ${SALON.pages.services}
- ${SALON.pages.about}
- ${SALON.pages.faq}
- ${SALON.pages.contact}
- ${SALON.url}/llms-full.txt

For current appointment availability, use the booking page or call the salon.
`;

/** Longer reference served at /llms-full.txt. Prices are left to /services, which reads live from Acuity. */
export const llmsFull = () => `${llmsSummary()}
## Hours
${hoursLines().join('\n')}

## Stylists
${STYLISTS.map((s) => `- ${s.fullName}${s.experience ? ` (${s.experience})` : ''}`).join('\n')}

## Booking
- Book online at ${SALON.pages.book}. Choose a service, then a stylist and time.
- Or call ${SALON.phoneDisplay}.
- Current services and starting prices: ${SALON.pages.services} (machine-readable: ${SALON.url}/api/services).

## Frequently asked questions
${FAQS.map((f) => `### ${f.question}\n${f.answer}`).join('\n\n')}

## Location
${SALON_ADDRESS_LINE}. Free street parking on South Main Street.
Directions: https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SALON_ADDRESS_LINE)}
`;
