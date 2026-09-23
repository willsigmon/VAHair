import { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION } from '@/lib/seo';

/**
 * Canonical salon facts. The layout's LocalBusiness schema, /llms.txt,
 * /llms-full.txt, /.well-known/mcp.json and the WebMCP tools all read from here,
 * so contact details only change in one place.
 */
export interface OpeningHours {
  readonly day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  readonly opens: string;
  readonly closes: string;
}

export const SALON = {
  name: SITE_NAME,
  alternateName: 'Virginia & Co. Hair Studio',
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  phoneDisplay: '(919) 671-8353',
  phoneE164: '+1-919-671-8353',
  email: 'vacohairstudio@gmail.com',
  address: {
    street: '104 South Main Street',
    city: 'Rolesville',
    region: 'NC',
    postalCode: '27571',
    country: 'US',
  },
  geo: { latitude: 35.9232013, longitude: -78.4577758 },
  hours: [
    { day: 'Tuesday', opens: '09:30', closes: '17:00' },
    { day: 'Wednesday', opens: '09:30', closes: '17:00' },
    { day: 'Thursday', opens: '09:30', closes: '16:00' },
    { day: 'Friday', opens: '09:30', closes: '14:00' },
  ] as readonly OpeningHours[],
  hoursNote: 'Saturday: alternating weeks, 9 AM to 5 PM. Closed Sunday and Monday.',
  social: ['https://instagram.com/vahairco', 'https://facebook.com/vahairco'],
  pages: {
    book: `${SITE_URL}/book`,
    services: `${SITE_URL}/services`,
    about: `${SITE_URL}/about`,
    faq: `${SITE_URL}/faq`,
    contact: `${SITE_URL}/contact`,
  },
} as const;

export const SALON_ADDRESS_LINE = `${SALON.address.street}, ${SALON.address.city}, ${SALON.address.region} ${SALON.address.postalCode}`;
