# Homepage Mapping — existing content → approved mockup

Mockup = visual reference. Codebase = authoritative content. Mockup copy ("Turn Your Marketing Into a
Growth Engine", "Visibility +48%", "Book a Consultation", etc.) and its example metrics are **not** used.

Legend — **Reuse**: kept as-is. **Modify**: same component/content, new markup/styling.
**Move**: content relocated within or across pages. **Replace**: old component retired in favour of a new one
that renders the same content.

| # | Mockup section | Existing content (inventory IDs) | Action | New component |
|---|---|---|---|---|
| 1 | Header: logo left, nav centre, coral CTA right, white bar | NAV-1…NAV-5 | **Replace** `components/Navbar.tsx` → sticky white header. All existing links kept; adds Home + Contact links and "Services ▾" (deep-links to each Services tab) / "Resources ▾" (Blog, Results, Free Assessment, ROI Calculator, FAQ) dropdowns — all existing routes. CTA label stays "Free Consultation". Client Login / Dashboard / Admin / Sign Out kept. | `components/layout/Header.tsx` |
| 2 | Hero: left messaging, right portrait at desk, floating cards, soft curves | H-1 eyebrow, H-2 H1, H-3 paragraph, H-5 floating card | **Modify + Move**. Eyebrow → spaced uppercase label. H1 unchanged; "Growth Machine." gets teal italic + coral underline. Adds two CTAs using **existing** labels/destinations: "Schedule A Free Consultation" → `/contact`, "Explore All Services" → `/services`. Right column uses existing unused asset `public/Nandi.png` (founder at desk with laptop — matches mockup composition). Floating cards: H-5 "Measurable outcomes" (existing) + "Na'ndi Hambrick · Founder & CEO" (from A-3). **No numeric metrics.** | `components/home/Hero.tsx` |
| 2a | — | H-4 Pexels "Marketing strategy session" image | **Retired from hero** (replaced by founder photo). Image is decorative, not copy; noted in preservation report. | — |
| 3 | Light-teal benefits strip | A-5 five pillars (from About) | **Reuse (duplicate)** — the site has five value statements, so the strip is 5-up on desktop instead of the mockup's 4. Nothing invented. Pillars remain on About too. | `components/home/ValueStrip.tsx` |
| 4 | Services: centred label/headline/intro, soft cards with teal icons + coral links | H-6, H-7, H-8 (all 4 services), H-9 | **Modify**. Small label "Our Services", H2 unchanged (phrase "For You" highlighted), intro unchanged. All 4 services kept (4-up on wide screens, 2-up tablet, 1-up mobile) — none dropped to force 3. Each card gets "Learn More →" deep-linking to the matching Services tab. "Explore All Services" button kept. | `components/home/ServicesGrid.tsx`, `components/shared/ServiceCard.tsx` |
| 5 | Split About: image left, deep-teal panel right | A-1 "What Sets Us Apart", A-2 intro (from About page); image `public/Nandi Samone Hambrick-Day.png` (unused asset; desk/stationery like mockup) | **Move (duplicate)** About intro onto the homepage. CTA → `/about`. Full About content stays on About. | `components/home/AboutSection.tsx` |
| 6 | (not in mockup) | H-10…H-13 ROI calculator CTA | **Modify** — kept as its own supporting section between About and the closing CTA (credibility → tool → conversion). Restyled as a cream split card. | `components/home/RoiCalculatorSection.tsx` |
| 7 | Closing CTA: warm off-white, navy heading, coral button, teal/coral shapes | H-14…H-19 consultation copy, checklist, assessment nudge, LeadForm | **Modify**. Centred eyebrow/H2/intro as in the mockup, with the checklist + assessment nudge and the working `LeadForm` below (coral submit = the prominent button). `id="contact"` kept. | `components/home/ConsultationSection.tsx` |
| 8 | Footer | FT-1…FT-8 | **Replace** markup, all content/links kept. | `components/layout/Footer.tsx` |
| — | — | H-20 unused `problems` array | Was never rendered → no visible content lost. Removed to fix the pre-existing lint error; the strings are preserved verbatim in `content-preservation-report.md`. | — |

## Final homepage order

Header → Hero → Value strip (5 pillars) → Services (4 cards) → About band (teal) → ROI calculator →
Closing consultation + form → Footer.

## Component reuse summary

| Existing | Fate |
|---|---|
| `components/Navbar.tsx` | Replaced by `components/layout/Header.tsx` (same links, behaviour, analytics) |
| `components/Footer.tsx` | Moved to `components/layout/Footer.tsx`, restyled |
| `components/LeadForm.tsx` | Moved to `components/shared/LeadForm.tsx`; Supabase submit logic untouched |
| `.container-page`, `.btn-*`, `.card`, `.input`, `.label`, `.section-title` | Kept as the design-system API, re-tokenised |
| New shared | `SectionHeading`, `PageHero`, `CallToAction`, `ServiceCard`, `Decor` (SVG curves) |
