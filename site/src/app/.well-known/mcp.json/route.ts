import { SALON } from '@/lib/salon';
import { WEBMCP_TOOLS } from '@/lib/webmcp-tools';

export const dynamic = 'force-static';

/**
 * Discovery document for AI agents: where the plain-text summaries live, which
 * public JSON endpoints are safe to read, and the read-only WebMCP tools the
 * pages register in the browser.
 */
const manifest = {
  name: SALON.name,
  description: SALON.description,
  url: SALON.url,
  contact: { phone: SALON.phoneE164, email: SALON.email },
  documentation: {
    llms: `${SALON.url}/llms.txt`,
    llmsFull: `${SALON.url}/llms-full.txt`,
  },
  endpoints: [
    { url: `${SALON.url}/api/services`, method: 'GET', description: 'Services by category with starting prices.' },
    { url: `${SALON.url}/api/stylists`, method: 'GET', description: 'Stylists who take appointments.' },
  ],
  webmcp: {
    transport: 'in-page',
    api: 'document.modelContext.registerTool',
    readOnly: true,
    tools: WEBMCP_TOOLS,
  },
  booking: { url: SALON.pages.book, note: 'Appointments are booked by the visitor on the booking page; agents cannot book on their behalf.' },
};

export function GET() {
  return Response.json(manifest, {
    headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400' },
  });
}
