/**
 * Read-only tools this site exposes to in-browser AI agents through WebMCP
 * (document.modelContext / navigator.modelContext). They only read public
 * information; none of them books, submits, or sends anything.
 * Shared by <WebMcpProvider /> and /.well-known/mcp.json.
 */
export interface WebMcpToolSpec {
  readonly name: string;
  readonly description: string;
  readonly inputSchema: { readonly type: 'object'; readonly properties: Record<string, unknown> };
}

export const WEBMCP_TOOLS: readonly WebMcpToolSpec[] = [
  {
    name: 'get_salon_info',
    description: 'Address, phone, email, opening hours and booking link for Virginia Page & Co. Hair Studio in Rolesville, NC.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'list_services',
    description: 'Current salon services grouped by category, with starting prices and durations from the live booking system.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'list_stylists',
    description: 'The stylists who take appointments at the studio.',
    inputSchema: { type: 'object', properties: {} },
  },
];
