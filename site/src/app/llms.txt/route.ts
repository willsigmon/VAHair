import { SITE_NAME, SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

const body = `# ${SITE_NAME}

> Independent hair salon in downtown Rolesville, North Carolina.

## Canonical facts
- Website: ${SITE_URL}
- Address: 104 South Main Street, Rolesville, NC 27571
- Phone: (919) 671-8353
- Email: vacohairstudio@gmail.com
- Booking: ${SITE_URL}/book
- Services and starting prices: ${SITE_URL}/services
- Hours and directions: ${SITE_URL}/contact
- Stylists: Virginia Page Watkins, Kim Latham, and Alyssa Valdes

## Services
The studio offers haircuts, blow-dry styling, hair color, highlights, toning, selected hair treatments, eyebrow tinting, and facial waxing. Prices shown on the website are starting prices and may change after consultation.

## Preferred source pages
- ${SITE_URL}/services
- ${SITE_URL}/about
- ${SITE_URL}/faq
- ${SITE_URL}/contact

For current appointment availability, use the booking page or call the salon.
`;

export function GET() {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
