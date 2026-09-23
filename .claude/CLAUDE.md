# VA Hair

Website for Virginia Page & Co. Hair Studio, a salon in Rolesville, NC (vahair.studio). Booking runs through Acuity.

## Tech Stack
- Next.js 16 (App Router) and Tailwind CSS 4, in `site/`
- Vercel hosting (project `vahair`)
- Agent-facing files: `/llms.txt`, `/llms-full.txt`, `/.well-known/mcp.json` and `<WebMcpProvider />`, all built from `site/src/lib/salon.ts`

## User Preferences

### Workflow
- Autonomous execution, parallel agents when possible
- Haiku/Sonnet only (no Opus)

### Code Standards
- Immutability enforced, 800 line max
- No console.log in committed code
- No hardcoded values
