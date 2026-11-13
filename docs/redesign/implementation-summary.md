# Implementation Summary: mockup-driven redesign

Baseline `da5a905`, implemented 2026-11-12. Nothing has been deployed.

## Architecture decision

The brief assumes Next.js App Router. This project is **Vite + React 18 with a hand-rolled History-API router**
(see `site-audit.md`). Migrating frameworks was out of scope ("use the existing routing architecture"), so the
brief's suggested tree was mapped onto the existing one:

| Brief | Implemented |
|---|---|
| `app/layout.tsx` | `src/App.tsx` (skip link, Header, `<main>`, Footer) |
| `app/page.tsx` + routes | `src/pages/*Page.tsx`, routed by `src/lib/router.ts`. No routes were added or removed. |
| `app/globals.css` + `styles/tokens.css` | `src/index.css` (`@layer components`) + `src/styles/tokens.css` |
| `components/layout/*` | `Header.tsx`, `Footer.tsx` |
| `components/home/*` | `Hero`, `ValueStrip`, `ServicesGrid`, `AboutSection`, `RoiCalculatorSection`, `ConsultationSection` |
| `components/shared/*` | `PageHero`, `SectionHeading`, `ServiceCard`, `CallToAction`, `Decor`, `LeadForm` |
| `components/ui/Button/Card/Container` | **Not created.** The project already exposes these as CSS component classes (`btn-*`, `card*`, `container-page`), and `CLAUDE.md` says to use them. React wrappers would duplicate them. |

## Design system

- **Tokens:** `src/styles/tokens.css` holds the brief's palette plus semantic and layout variables. The same colours are
  in `tailwind.config.js` as scales: `navy`, `teal` (600 = brand), `sage`, `coral` (500 = brand), `cream`
  (50 = off-white, 100 = cream), `ink` (text, 800 = body text). `max-w-page`, `rounded-card`, `shadow-soft` and
  `shadow-lift` were added.
- **Palette migration:** every `pink-*`, `almond-*` and `tan-*` class in `src/` was renamed mechanically to `coral-*`,
  `ink-*` and `cream-*`. The old scales are gone.
- **Accessibility:** white text on the brand coral `#E97855` is only 2.9:1, so filled buttons use `coral-600`
  `#C4512F` (4.6:1). Coral text on tinted surfaces uses `coral-700`. Teal-600 on white is 5.8:1. Body text and ink-400
  and above pass AA on white and cream. Other additions: a global `:focus-visible` ring, `prefers-reduced-motion`
  handling, a skip link, `aria-expanded`/`aria-controls` on every disclosure, and `role="tablist"` on Services tabs.
- **Typography:** Playfair Display (italic weights added in `index.html`) for headings, Inter for body text.
  `.text-highlight` gives the mockup's teal italic phrase. `.eyebrow` and `.eyebrow-ruled` give the spaced labels,
  with optional coral rules.
- **Component classes** (`src/index.css`): `section`, `section-tight`, `btn-primary/secondary/outline/outline-light/ghost`,
  `link-arrow`, `card`, `card-hover`, `card-cream`, `card-tint`, `card-peach`, `card-deep`, `icon-chip`, `pill-active`,
  `pill-idle`, `input`, `label`, `badge`.
- **Decor:** `Decor.tsx` has SVG waves (`WaveCorner`), card corner curves (`CardCurve`), deep-panel arcs (`PanelArcs`)
  and the hand-drawn coral underline (`Swoosh`). All are `aria-hidden`.

## Global layout

- **Header:** a new sticky white bar replaces the fixed, transparent Navbar. Logo on the left. Home, About,
  Services ▾ (All + four tab deep-links), Resources ▾ (Blog, Results, Free Assessment, ROI Calculator, FAQ) and
  Contact in the centre. The coral "Free Consultation" button sits on the right. Client Login, or an Account menu
  when signed in, shows as an icon at 1024–1279 px and as text at ≥1280 px. Below 1024 px a hamburger opens a grouped
  panel. A scroll-listener leak in the old Navbar (`useState` used as an effect) is fixed. Pages no longer need
  `pt-28` padding.
- **Footer:** navy with teal arcs. All the original links, socials, newsletter, email and CTAs are kept.

## Route-by-route

| Route | What changed |
|---|---|
| `/` | Rebuilt to the mockup's sequence: two-column hero (founder photo bleeding right, two floating cards with existing copy, no metrics) → light-teal 5-pillar strip → "Our Services" with 4 tinted cards and coral "Learn More" deep-links → split teal About band → ROI calculator card → closing consultation section with the working LeadForm. See `homepage-mapping.md`. |
| `/about` | Split PageHero (founder photo + name card) → editorial "Why We Exist" → pillar cards on cream (3+2 centred) → "How We Work" on a deep-teal band → consultation CTA. |
| `/services` | PageHero shows the active tab's H1 and intro, with tab pills. **New:** `?tab=marketing / virtual-assistant / events / brand` deep-links (used by the header and homepage cards). The URL updates when you switch tabs. Marketing: problem grid + deep-teal "growth problems" card, alternating service rows with Problem/Outcome panels, branding teaser, contained ROI CTA. VA: service chips, pricing cards (Most Popular raised with a coral ring), trust badges, AI band. Events: three pricing cards. Brand: Problem/Outcome, image + deliverables, deep CTA. |
| `/branding` | PageHero → Problem/Outcome → image + deliverables → deep-teal CTA. |
| `/contact` | PageHero → checklist card, numbered "What happens after you submit?" card, assessment card, email link · sticky LeadForm. Submission logic is untouched. |
| `/faq` | PageHero → accordion with `aria-controls`/region → cream CTA. |
| `/results`, `/portfolio` | PageHero with the placeholder disclaimer → filter pills → case cards → cream CTA. The modal is restyled. |
| `/blog` | PageHero → featured post and grid. The article view gets its own cream header and a contained CTA. |
| `/calculator` | PageHero → inputs card + results (deep-teal annual card, peach CTA). The maths is untouched. |
| `/assessment` | All four steps share a cream backdrop with waves. Selection, progress and score bars use teal. Scoring and the Supabase insert are untouched. |
| `/privacy`, `/terms` | Compact PageHero → sections in a divided card. Text unchanged, Petal Assist copy included (flagged). |
| `/login` | Cream backdrop, teal mark, restyled. Auth logic untouched. |
| `/onboarding`, `/dashboard`, `/admin` | Palette migration, cream backdrop, teal stepper and toggles, `pt-28` removed. Layout otherwise unchanged. |
| Orphans (`Packages`, `Portfolio`, `Checkout`) | Only the colour classes were renamed and `pt-28` removed. They are still unrouted. |

## Validation actually run

| Check | Result |
|---|---|
| `npm run typecheck` | ✅ pass |
| `npm run lint` | ✅ 0 errors, 2 pre-existing warnings (Auth/Cart contexts). The baseline had 3 errors, now fixed. |
| `npm run build` | ✅ pass (CSS 62 kB / 10 kB gzip, JS 443 kB / 123 kB gzip) |
| Automated tests | ⚠️ None exist in the project |
| Route smoke test (headless Chrome over CDP) | ✅ 21 paths × 5 widths (320/375/768/1024/1440) = 105 loads. No horizontal overflow, no console errors. Unknown path → Home, as before. |
| Interaction checks (CDP) | ✅ The mobile menu opens and navigates, then closes. The header Services dropdown switches tabs while already on `/services`. Tab click updates `?tab=`. A homepage card deep-links to the Events tab. The FAQ accordion expands. LeadForm required fields are enforced. |
| Visual comparison with the mockup | ✅ Screenshots reviewed at 1440, 1024, 768 and 375 for Home, plus About, Services, Contact, Results, Events and Login. Section order, hero composition, value strip, card treatment, teal About band and closing CTA all match the mockup's structure. |
| Accessibility | Partial. Contrast was computed for the main pairs, and keyboard/ARIA patterns were reviewed by hand. No axe or Lighthouse run. |
| Not verified | Signed-in views (`/onboarding`, `/dashboard`, `/admin`) redirect to `/login` without credentials, so their restyled layouts were not seen rendered. Supabase writes were not exercised, to avoid creating test leads. |

## Known gaps / follow-ups

1. **Logo:** the existing gold/pink logo clashes with the teal/coral palette. New artwork is needed to match the mockup.
2. **Petal Assist copy** remains in Privacy, Terms and Login. Needs a business/legal decision.
3. **Newsletter form** is client-side only. **"Browse Packages"** (Dashboard) still goes nowhere.
4. **`CLAUDE.md` has been updated** to describe the new design system, component paths and History-API routing.
5. **Images:** `Nandi.png` is 598 px wide and shown up to about 720 px on wide desktops, so it softens slightly on
   high-DPI screens. A larger original would help. The remote Pexels images are unchanged.
