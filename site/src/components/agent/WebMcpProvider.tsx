'use client';

import { useEffect } from 'react';
import { SALON, SALON_ADDRESS_LINE } from '@/lib/salon';
import { WEBMCP_TOOLS } from '@/lib/webmcp-tools';

type ToolResult = { content: { type: 'text'; text: string }[] };
type Registration = { unregister?: () => void } | undefined;
type ModelContext = {
  registerTool: (tool: Record<string, unknown>) => Registration;
  unregisterTool?: (name: string) => void;
};

const asResult = (data: unknown): ToolResult => ({
  content: [{ type: 'text', text: JSON.stringify(data) }],
});

// The site's own APIs answer 503 with `fallback: true` and the published list when
// the booking system is unreachable; pass that through so agents see what visitors see.
const readJson = async (path: string) => {
  const res = await fetch(path, { headers: { Accept: 'application/json' } });
  const body = await res.json().catch(() => null);
  if (!body || (!res.ok && !body.fallback)) throw new Error(`${path} returned ${res.status}`);
  return body;
};

const handlers: Record<string, () => Promise<ToolResult>> = {
  get_salon_info: async () =>
    asResult({
      name: SALON.name,
      address: SALON_ADDRESS_LINE,
      phone: SALON.phoneDisplay,
      email: SALON.email,
      hours: SALON.hours,
      hoursNote: SALON.hoursNote,
      bookingUrl: SALON.pages.book,
      servicesUrl: SALON.pages.services,
    }),
  list_services: async () => asResult(await readJson('/api/services')),
  list_stylists: async () => asResult(await readJson('/api/stylists')),
};

/**
 * Registers the site's read-only WebMCP tools when the browser (or an extension
 * polyfill) exposes a model context. Renders nothing and is a no-op otherwise.
 */
export default function WebMcpProvider() {
  useEffect(() => {
    const scope = globalThis as unknown as {
      document?: { modelContext?: ModelContext };
      navigator?: { modelContext?: ModelContext };
    };
    const modelContext = scope.document?.modelContext ?? scope.navigator?.modelContext;
    if (!modelContext || typeof modelContext.registerTool !== 'function') return;

    const registrations = WEBMCP_TOOLS.map((tool) => {
      try {
        return {
          name: tool.name,
          handle: modelContext.registerTool({
            ...tool,
            annotations: { readOnlyHint: true },
            execute: handlers[tool.name],
          }),
        };
      } catch {
        return { name: tool.name, handle: undefined };
      }
    });

    return () => {
      registrations.forEach(({ name, handle }) => {
        if (handle?.unregister) handle.unregister();
        else modelContext.unregisterTool?.(name);
      });
    };
  }, []);

  return null;
}
