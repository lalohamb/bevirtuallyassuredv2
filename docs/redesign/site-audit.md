# Site Audit — Be Virtually Assured (pre-redesign)

Audited at commit `da5a905` (branch `main`), 2026-11-12.

## Stack reality check

The redesign brief describes a **Next.js App Router** project. This repository is **not** Next.js:

| Concern | Actual |
|---|---|
| Framework | React 18 + TypeScript, bundled by Vite 5 |
| Routing | Hand-rolled History-API router in `src/lib/router.ts` (`parsePath()` over `window.location.pathname`, `navigate()` → `pushState` + synthetic `popstate`). `CLAUDE.md` still says "hash routing" — that is stale; the code uses clean paths and relies on the nginx SPA fallback in `nginx.conf`. |
| Styling | Tailwind 3 + `@layer components` classes in `src/index.css` |
| Data | Supabase (Postgres + RLS) via `@supabase/supabase-js`, no server code |
| Icons | `lucide-react` |
| Fonts | Inter + Playfair Display from Google Fonts (`index.html`) |
| Tests | None configured |

Per the brief ("Use the existing routing architecture… do not migrate the entire routing architecture without justification"), the redesign stays on Vite + the existing router. The suggested `src/app/*` tree is mapped onto `src/pages/*` + `src/components/*`.

## Route inventory

Every route is registered in three places: `Route` union + `parsePath()` in `src/lib/router.ts`, and the switch in `src/App.tsx`. Unknown paths fall through to Home.

| Path | Component | Access | Data | Notes |
|---|---|---|---|---|
| `/` | `HomePage` | public | `leads` INSERT (LeadForm) | Hero, services preview, ROI CTA, consultation + form |
| `/services` | `ServicesPage` | public | — | 4 client-side tabs: Marketing Solutions, Virtual Assistant, Event & Project Management, Brand Strategy. Contains all pricing. |
| `/results` | `ResultsPage` | public | `portfolio_projects` SELECT, falls back to 3 placeholder cases | Filter pills + case-study modal |
| `/portfolio` | `ResultsPage` | public | same | Alias of `/results` |
| `/about` | `AboutPage` | public | — | Founder hero, Why We Exist, 5 pillars, 4-step method |
| `/blog` | `BlogPage` | public | `blog_posts` SELECT, falls back to 3 posts | Article view is in-component state (no per-post URL) |
| `/assessment` | `AssessmentPage` | public | `leads` INSERT | 4-step funnel: intro → 8 questions → contact capture → score |
| `/calculator` | `CalculatorPage` | public | — | ROI sliders, CTA → contact |
| `/contact` | `ContactPage` | public | `leads` INSERT (LeadForm) | |
| `/faq` | `FAQPage` | public | — | 6-item accordion |
| `/privacy` | `PrivacyPage` | public | — | **Still Petal Assist legal copy** |
| `/terms` | `TermsPage` | public | — | **Still Petal Assist legal copy** |
| `/branding` | `BrandingPage` | public | — | Brand Strategy detail page (linked from Services) |
| `/login` | `LoginPage` | public | Supabase auth | Sign in / sign up toggle; one Petal Assist line |
| `/onboarding` | `OnboardingPage` | signed-in | `client_profiles` | 3-step form |
| `/dashboard` | `DashboardPage` | signed-in | `client_profiles`, `orders` | "Browse Packages" → `navigate('packages')` (no route → Home) |
| `/admin` | `AdminPage` | admin claim | `leads`, `blog_posts` | Leads + blog CMS |

Orphaned (no route, not imported): `PackagesPage`, `PortfolioPage`, `CheckoutPage`.

Broken destinations called from live pages: `navigate('packages')` ×4 (Dashboard, orphan pages), `navigate('checkout')` ×1 (orphan). Both land on Home.

## Current homepage section structure (`src/pages/HomePage.tsx`)

1. **Hero** (L38–84) — pill eyebrow, H1, paragraph, Pexels team photo with floating "Measurable outcomes" card. *No CTA buttons in the hero.*
2. **Services preview** (L86–119) — "What We Can Do For You", 4 service cards in 2×2, "Explore All Services" button.
3. **ROI Calculator CTA** (L121–153) — dark almond card, two buttons.
4. **Final CTA / Contact** (L155–197, `id="contact"`) — consultation copy, 4-item checklist, assessment nudge, `LeadForm`.
5. Unrendered: `problems` array (L9–16) is defined but never rendered (and fails lint).

## Images and brand assets

| Asset | Size | Used where |
|---|---|---|
| `public/virtually_assured_horizontal_logo.png` | 714×283 | Navbar, Footer (inverted) |
| `public/about-hero.png` | 543×392 | About hero (founder) |
| `public/Nandi.png` | 598×770 | **Unused** — founder at desk with laptop, portrait. Closest match to the mockup hero composition. |
| `public/Nandi Samone Hambrick-Day.png` | 652×438 | **Unused** — business card on desk, plant, gold tray. Closest match to the mockup's About-band workstation image. |
| Other `public/*.png` logo variants (1–2 MB each) | — | Unused |
| Pexels remote images | — | Home hero, Services rows, Branding, Results, Blog fallbacks, OG image |

**Brand mismatch:** the mockup shows a teal/coral "V" check-mark logo. The only logo artwork in the repo is gold/pink ("Virtually Assured Co."). No new logo exists, so the existing logo is kept. New logo artwork is needed for full mockup fidelity.

## Forms, integrations, CTAs

- `LeadForm` (Home, Contact) → `supabase.from('leads').insert`. Fires `CONTACT_SUBMITTED`.
- Assessment capture → `leads` insert with JSON answers.
- Footer newsletter → **client-side only** (`setDone(true)`); nothing is stored or sent.
- No scheduling integration (Calendly etc.). "Consultation" CTAs all route to `/contact`.
- Analytics: `track(Events.X)` → `gtag` if present. Events used: CONSULTATION_STARTED, ASSESSMENT_STARTED/COMPLETED, CALCULATOR_STARTED/COMPLETED, SERVICES_VIEWED, CASE_STUDY_VIEWED, CONTACT_SUBMITTED.
- Social: Instagram, Facebook (linked); LinkedIn icon is a non-link `<span>`.
- Contact info: `hello@bevirtuallyassured.com` (footer only).

## Reusable components (before)

`Navbar` (fixed, transparent-until-scroll; registers scroll listener via `useState` initializer — never cleaned up), `Footer` (incl. inline `NewsletterForm`), `LeadForm`. Everything else is page-local markup. No shared page-hero, section-heading or CTA component — each page re-derives them.

## Styling system (before)

Tailwind palette: `pink` (primary, overrides Tailwind's pink), `almond` (text), `tan` (background). Component classes: `container-page` (max-w-6xl), `btn*`, `card`, `card-hover`, `input`, `label`, `section-title`, `section-subtitle`, `badge`. Every page offsets the fixed navbar with `pt-28`.

## SEO metadata

Single static set in `index.html`: title, description, canonical `/`, OG/Twitter (Pexels image). No per-route titles, no structured data. Favicon points at a non-existent `/vite.svg`.

## Responsive behaviour (before)

Mobile-first Tailwind grids; navbar collapses at `md` with a hamburger. Navbar logo is `h-20 sm:h-24` inside a 96–112px bar. Fixed navbar + transparent background reduces legibility over content when scrolled to 0 on pages with content behind it.

## Baseline checks (before any change)

- `npm run lint` → **3 errors, 2 warnings** (unused `problems` in HomePage, unused `useState` in ContactPage, unused `saved` in AdminPage).
