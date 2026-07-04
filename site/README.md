# Virginia Page & Co. Hair Studio — vahair.studio

Next.js (App Router) + React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui, deployed on Vercel.

## Commands

| Command         | Action                                       |
| :-------------- | :------------------------------------------- |
| `npm install`   | Install dependencies                         |
| `npm run dev`   | Start local dev server at `localhost:3000`   |
| `npm run build` | Build for production (+ IndexNow submission) |
| `npm run start` | Serve the production build locally           |
| `npm run lint`  | Type-check with `tsc --noEmit`               |

## Structure

- `src/app/` — routes (pages, API route handlers, dynamic `/og.png`)
- `src/components/` — React components (`ui/` holds shadcn/ui primitives)
- `src/lib/acuity/` — Acuity Scheduling API client, cache, helpers
- `src/lib/data/stylists.ts` — single source of truth for stylists
- `src/styles/global.css` — Tailwind 4 + brand design tokens
- `public/scripts/animations.js` — vanilla JS animation engine (re-runs per full page load)

## Environment

Optional Acuity API credentials (API routes fall back to static data without them):

```
ACUITY_USER_ID=...
ACUITY_API_KEY=...
```
