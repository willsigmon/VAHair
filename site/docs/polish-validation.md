# VAHair polish

Brand North Star: a warm, personal downtown salon with clear prices and an obvious path to book.

Primary visual references: the existing VAHair site (cream, charcoal, editorial serif, real stylist portraits) and VAHair Acuity theme (`public/acuity-custom.css`, matching typography and restrained controls). Mobbin references reviewed: [Dropbox photography hero](https://mobbin.com/sites/sections/a8980906-348f-4e92-8247-f39ba2b2abc8) and [NEON editorial hero](https://mobbin.com/sites/sections/1d1863b3-a450-4317-9765-12ae9994db64). Used for composition restraint, without importing their branding. Token specification: `design-tokens.json`; existing contrast-corrected taupe and dark gold remain in use.

What makes this not look AI-generated:
- Existing stylist portraits, approved salon copy, and Rolesville contact details ground the pages in this business.
- Cormorant Garamond, Outfit, and thin gold rules preserve the established identity.
- Numbered service rows replace generic icon tiles; motion supports reading rather than adding particles or cursor effects.

## Verification

```sh
npm ci
npm run lint && npm run build
npm run test:seo
npm run start -- --port 3100
# In a second terminal; install Playwright Chromium first if needed:
npx playwright install chromium
SITE_URL=http://127.0.0.1:3100 npm run test:browser
# For an installed system browser, additionally set CHROMIUM_PATH.
```

Browser checks cover eight public pages at 390px, axe WCAG A/AA checks, overflow, header and sticky booking, menu Escape/focus restoration, 1440px homepage capture, disabled JavaScript, and deterministic cross-origin Acuity fixtures. Booking cases cover success, all three calendars, repeated selection, silent error-document timeout, script failure, and blocked iframe. They do not submit appointments. Screenshots are written to ignored `output/polish/`.

The scheduler keeps Call, Text, and direct Acuity links available even without JavaScript. Its eight-second timeout requires a validated Acuity `load`/`sizing` message and the helper script, rather than trusting an iframe `load` event. Fixed iframe space prevents fallback state changes from moving the rest of the page. Saturday hours remain prose because the repository does not give the dates of the alternating schedule.

These are local functional and accessibility checks; they do not establish field Core Web Vitals or a Lighthouse score.
