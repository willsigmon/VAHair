# Brand — Virginia Page & Co. Hair Studio

> Status: Approved
> Owner: Virginia Page Watkins (brand decisions); website implementation managed by Will Sigmon
> Last updated: 2026-07-14

## 1. Brand core
- **Purpose:** Help Rolesville-area clients feel beautiful and express themselves through skilled, personal hair care in Virginia's hometown salon.
- **Promise:** Warm, experienced, straightforward salon care from stylists clients can know and trust.
- **Primary audience:** Women and families in Rolesville and nearby Wake County communities seeking cuts, color, highlights, styling, and facial waxing from an established local salon.
- **Secondary audience:** Existing clients returning to book with a preferred stylist and new residents looking for a trusted nearby salon.
- **What they should feel:** Welcomed, understood, confident, and comfortable booking.
- **Personality:** Warm, not saccharine; polished, not precious; confident, not flashy; personal, not performative; modern, not trend-chasing.

## 2. Positioning
- **Category / frame of reference:** Independent, full-service neighborhood hair studio in downtown Rolesville, North Carolina.
- **Core problem:** Clients need a reliable local stylist whose services, pricing expectations, availability, and booking path are easy to understand.
- **Differentiator:** A hometown, female-owned studio pairing long-term professional experience with direct access to the individual stylist who will serve the client.
- **Reasons to believe / proof:** Virginia began her career in 2009 and opened the studio in her hometown; the team publishes stylist identities, service pricing, location, hours, and live Acuity booking access.
- **Competitors or alternatives:** Nearby independent salons, chair-rental stylists, national salon chains, and at-home color or styling.
- **Must never resemble:** A high-volume franchise, an influencer beauty brand, a medical spa, or an anonymous luxury salon where style obscures practical booking information.

## 3. Voice and message
- **Voice:** Neighborly, assured, concise, and encouraging. Speak like an experienced stylist who listens before recommending.
- **Vocabulary to use:** feel beautiful, express yourself, consultation, tailored, experienced, hometown, book with your stylist, clear pricing.
- **Vocabulary to avoid:** transformation miracle, flawless, anti-aging, luxury experience, boss babe, revolutionary, instant, guaranteed results.
- **Sample headline:** If it makes you feel beautiful, do it.
- **Sample supporting copy:** Thoughtful cuts, dimensional color, highlights, styling, and waxing from an experienced local team in downtown Rolesville.
- **Sample CTA:** Find your service and book.
- **Copy anti-patterns:** Keyword-stuffed city lists; exaggerated beauty claims; generic “elevate your look” copy; pressure tactics; implying one hair type or beauty standard is preferred; presenting consultation-dependent pricing as a guarantee.

## 4. Visual direction
- **Reference 1:** The current VAHair Astro rebuild (`site/src`, `site/public/images`) — preserve its warm cream, charcoal, muted-gold palette; editorial serif hierarchy; direct booking emphasis; and first-party stylist photography.
- **Reference 2:** The VAHair Acuity booking theme (`site/public/acuity-custom.css`) — keep the website and booking handoff visually continuous through Cormorant Garamond, Outfit, restrained gold accents, readable form states, and warm surfaces.
- **Anti-reference:** Generic national blow-dry-bar or beauty-franchise sites — avoid bright trend palettes, stock “perfect hair” imagery, sales-led popups, crowded promotion strips, and interchangeable aspirational copy.
- **Art direction in one sentence:** A warm downtown salon portrait: editorial but approachable, grounded in real people, real place, and an obvious path to book.
- **Logo rules:** Use the provided transparent logo asset (`site/public/images/logo-header.png`) without recoloring, stretching, adding effects, or placing it where contrast makes it unreadable; preserve generous clear space.
- **Typography roles:** Cormorant Garamond for expressive display headlines and selective editorial emphasis; Outfit for body, navigation, labels, prices, and booking UI; tabular figures for prices and schedule data.
- **Color tokens (OKLCH):** `bg: oklch(97.5% 0.009 82)`, `surface: oklch(94.5% 0.012 78)`, `ink: oklch(29% 0.010 70)`, `muted: oklch(59% 0.018 65)`, `accent: oklch(72% 0.075 84)`, `signal: oklch(61% 0.095 25)`; retain the existing hex tokens as fallbacks until browser support and visual parity are verified.
- **Photography / illustration / iconography:** Prefer the existing first-party salon and stylist photography (`hero.jpg`, `salon.jpg`, `virginia.jpg`, `kim.jpg`, `alyssa.jpg`). Crop for human presence and environment rather than generic hair-detail stock. Use simple custom or inline icons only where they clarify an action.
- **Layout and composition:** Calm editorial hierarchy, asymmetrical image/text compositions where useful, strong whitespace, visible service prices, and a persistent but non-aggressive booking path.
- **Shape / radius language:** Mostly flat editorial planes with restrained soft corners for interactive cards; do not make every section or control pill-shaped.
- **Texture:** Natural photographic grain and warm paper-like surfaces; no synthetic gradient blobs or glass panels.
- **Motion:** Slow, hierarchy-led reveals and small tactile feedback only when it aids orientation or confirms an action; honor reduced motion and avoid cursor or particle effects that cost responsiveness or distract from booking.

## 5. Product experience
- **UX principles:** Make booking the clearest next step; show services and starting prices before asking for commitment; keep stylist choice understandable; preserve context when handing off to Acuity; use plain-language policies.
- **Accessibility requirements:** WCAG 2.2 AA target; semantic landmarks and headings; visible keyboard focus; 44px minimum touch targets; descriptive image text; sufficient text/background contrast; reduced-motion support; no color-only status cues.
- **Loading / empty / error-state tone:** Calm and useful. Explain what is happening, preserve a phone/contact fallback, and never blame the client.
- **Trust signals:** Real stylist names and photos, years of experience, physical address, phone/email, published hours, transparent starting prices, consultation disclaimers, and secure Acuity booking.
- **Platform and performance constraints:** Mobile-first; fast on average cellular connections; minimal client JavaScript; stable layouts; optimized first-party images; crawlable service/location content; reliable Vercel deployment and Acuity API fallbacks.

## 6. Distinctiveness contract
- **Signature visual move:** Pair oversized editorial reassurance with candid, locally grounded salon/stylist photography and a thin muted-gold rule that guides the eye toward booking.
- **Signature interaction or content move:** Let clients move from a clearly priced service to the right stylist/booking category with availability context and a visible phone fallback.
- **Reusable motifs:** Fine gold rules, editorial numerals for service groups, warm paper surfaces, close portrait crops, and the “feel beautiful” line used sparingly.
- **Do not repeat from other projects:** Oxblood editorial palettes, generic bento grids, glassmorphism, floating gradient ornaments, default Lucide feature trios, SaaS-style proof strips, or copied hero compositions.
- **Generic patterns forbidden here:** “Elevate your beauty” headlines, anonymous stock-model heroes, popup-first lead capture, excessive parallax/particles, rounded cards everywhere, fake scarcity, and SEO copy visibly written for a crawler rather than a client.
- **Swap-test explanation:** This direction depends on Virginia's hometown story, real team, downtown Rolesville location, direct stylist booking, and the studio's existing imagery; replacing the name with a software company, medical spa, or national salon would make the content and visual system incoherent.

## 7. Sources and governance
- **Briefs / research:** `README.md`; `content/homepage.md`; `content/about.md`; `content/services.md`; `content/contact.md`; `content/appointments.md`; `technical/seo-metadata.md`; current Astro and Next.js migration source.
- **Asset paths / design files:** `site/public/images/`; `site/public/acuity-custom.css`; `site/src/styles/global.css`; no Figma or external design file was found in the repository.
- **Decisions confirmed by:** Will Sigmon on 2026-07-14; Virginia Page Watkins remains the business/brand owner.
- **Open questions:** None blocking. Use “Virginia Page & Co. Hair Studio” consistently; Virginia is the final business/brand approver.
- **Confidence / evidence gaps:** High confidence in business facts and current visual system from repository evidence. No approved external reference board, formal logo usage guide, or written photography policy was found.
- **Change rule:** Proposed brand changes must update this file, state the reason, and receive owner confirmation before implementation.

## Approval checklist
- [x] No placeholders in the proposed direction
- [x] At least two named first-party references and one anti-reference with concrete lessons
- [x] Real headline, body, and CTA examples
- [x] Project-specific visual, voice, and UX rules
- [x] Signature moves are not copied from another project
- [x] Swap test fails for unrelated brands
- [x] Owner confirmed the direction
