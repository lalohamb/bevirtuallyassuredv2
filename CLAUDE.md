# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Vite dev server
npm run build      # production build → dist/
npm run preview    # serve the built dist/
npm run typecheck  # tsc --noEmit -p tsconfig.app.json
npm run lint       # eslint .
```

There is no test framework in this project. The verification loop for any change is
`npm run typecheck && npm run lint && npm run build` — run all three before calling work done.

`.env` must define `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`; `src/lib/supabase.ts` reads
them at module load with no fallback, so a missing value fails the app at startup, not at first query.

## Architecture

React 18 + TypeScript + Vite + Tailwind, with Supabase as the entire backend. No backend code of our
own — no API layer, no server functions. Every page talks to Postgres directly through the Supabase
JS client and is gated by row-level security. **When you add a data-backed feature, the access rule
belongs in a migration under `supabase/migrations/`, not in a client-side check.**

### Routing — History API, hand-rolled

There is no React Router. [src/lib/router.ts](src/lib/router.ts) holds a `Route` union, a `parsePath()`
switch over `window.location.pathname`, a `useRouter()` hook, and a `navigate(path)` helper that does
`history.pushState` + a synthetic `popstate`. [src/App.tsx](src/App.tsx) switches on `route.name` to pick a page component.

Adding a page means editing **three** places: the `Route` union, the `parsePath()` switch, and the
`App.tsx` switch. Miss `parsePath()` and the route silently falls through to `HomePage` — unknown
paths have no 404, they render home. Header/footer link lists live in [src/lib/navigation.ts](src/lib/navigation.ts).

Query strings survive `navigate()` (e.g. `navigate('services?tab=events')`); `ServicesPage` reads `?tab=`
(`marketing` | `virtual-assistant` | `events` | `brand`) and re-reads it on `popstate`. Clean paths rely on the
SPA fallback in [nginx.conf](nginx.conf) (`try_files … /index.html`) for deep links.

### Providers and shared state

`AuthProvider` wraps `CartProvider` wraps the page tree.

- [src/context/AuthContext.tsx](src/context/AuthContext.tsx) — wraps `supabase.auth`, exposes
  `session`/`user`/`loading` plus `signIn`/`signUp`/`signOut`. PKCE flow, session persisted to
  localStorage by the client config in [src/lib/supabase.ts](src/lib/supabase.ts).
- [src/context/CartContext.tsx](src/context/CartContext.tsx) — in-memory only, keyed by package
  `slug`. Nothing persists it; a page refresh empties the cart.

### Auth and admin gating

Gating is per-page and client-side only — there is no route guard in `App.tsx`. Pages that need a user
read `useAuth()`, wait out `loading`, then `navigate('login')` or `navigate('')` themselves
(see [AdminPage.tsx:13-19](src/pages/AdminPage.tsx#L13-L19) for the pattern; always check
`authLoading` first or you'll redirect an authenticated user mid-hydration).

Admin identity is a `user_metadata.app_role === 'admin'` claim, checked two ways that must stay in
sync: `isAdmin()` in [src/lib/supabase.ts](src/lib/supabase.ts#L104) for UI, and
`(auth.jwt() -> 'user_metadata' ->> 'app_role') = 'admin'` in the RLS policies. The client check only
hides UI — the RLS policy is what actually enforces it. The role is set by hand in the Supabase
dashboard (Authentication → Users → user_metadata), as documented in the migration header.

### Database

Six tables from `20260730212737_create_va_company_schema.sql` plus `blog_posts` from
`20260731000000_add_blog_posts_and_admin_policies.sql`. RLS shape:

| Table | Anon/authenticated | Admin |
|---|---|---|
| `leads` | INSERT only — no SELECT | SELECT, UPDATE status |
| `packages`, `portfolio_projects` | SELECT | ALL |
| `blog_posts` | SELECT where `published` | ALL |
| `client_profiles`, `orders`, `order_items` | owner-scoped via `auth.uid()` | — |

Owner columns default to `auth.uid()`, so inserts may omit `user_id`. Prices are integer cents
everywhere; render with `formatPrice()` from [src/lib/format.ts](src/lib/format.ts). Orders and
`order_items` are insert-only for clients — status changes are service-role work, so anything that
needs to advance an order requires a server-side path this repo doesn't have yet.

Migrations are raw SQL applied through Supabase; they lead with a doc comment describing tables and
security intent and use `IF NOT EXISTS` / `DROP POLICY IF EXISTS` so they re-run safely. Match that
style.

### Styling

Design follows the approved mockup (docs in [docs/redesign/](docs/redesign/)). Tokens live in
[src/styles/tokens.css](src/styles/tokens.css) and are mirrored as Tailwind scales in
[tailwind.config.js](tailwind.config.js) — change both together:

- `navy` (headings), `teal` (600 = brand; icons, highlighted phrases, deep bands), `sage`,
  `coral` (500 = brand), `cream` (50 off-white, 100 cream backgrounds), `ink` (text; 800 = body).
- **Filled coral buttons use `coral-600`** — brand `coral-500` with white text fails AA (2.9:1). Coral text on
  tinted surfaces uses `coral-700`.
- The old `pink`/`almond`/`tan` scales are gone.

Reusable classes live in `@layer components` in [src/index.css](src/index.css) — `container-page`, `section`,
`section-tight`, `eyebrow`/`eyebrow-ruled`, `section-title`, `section-subtitle`, `text-highlight` (teal italic
phrase), `btn-primary`/`btn-secondary`/`btn-outline`/`btn-outline-light`/`btn-ghost`, `link-arrow`,
`card`/`card-hover`/`card-cream`/`card-tint`/`card-peach`/`card-deep`, `icon-chip`, `pill-active`/`pill-idle`,
`input`, `label`, `badge`. **Use these rather than re-deriving utility strings.**

Shared React pieces: `components/layout/{Header,Footer}`, `components/shared/{PageHero,SectionHeading,CallToAction,
ServiceCard,Decor,LeadForm}`, homepage sections in `components/home/`. Every interior page opens with `PageHero`
and usually closes with `CallToAction`. Copy shared across pages (About intro, pillars, founder, consultation
points) lives in [src/content/company.ts](src/content/company.ts).

The header is `sticky` (not fixed), so pages need no top padding offset.

Icons come from `lucide-react` only (it's excluded from Vite's `optimizeDeps`). Fonts — Inter and
Playfair Display (incl. italics) — are linked in [index.html](index.html), not imported in CSS. For high-priority
images spread `HIGH_PRIORITY` from `@/lib/format` (React 18 warns on the `fetchPriority` prop).

### Conventions

- Import via the `@/` alias (`@/components/Foo`), never deep relative paths. Configured in both
  [vite.config.ts](vite.config.ts) and [tsconfig.app.json](tsconfig.app.json).
- Pages are named exports (`export function HomePage()`), not defaults; `App` is the one default export.
- Analytics is `track(Events.X, props)` from [src/lib/analytics.ts](src/lib/analytics.ts) — a thin
  `gtag` wrapper that logs in dev and no-ops when gtag is absent. Add new event names to the `Events`
  const rather than passing raw strings.
- `noUnusedLocals`/`noUnusedParameters` are off, so dead code won't fail typecheck. `strict` and
  `noFallthroughCasesInSwitch` are on.

## Known state of the codebase

The site was rebranded from **Petal Assist** (a virtual-assistant service) to **Be Virtually Assured** (a
marketing agency), and the migration is incomplete. Expect to hit this:

- Stale "Petal Assist" copy remains in [LoginPage.tsx](src/pages/LoginPage.tsx),
  [PackagesPage.tsx](src/pages/PackagesPage.tsx), [PrivacyPage.tsx](src/pages/PrivacyPage.tsx), and
  [TermsPage.tsx](src/pages/TermsPage.tsx). Left untouched pending a business/legal decision.
- The logo artwork is gold/pink and predates the teal/coral palette; new artwork is pending.
- [PackagesPage.tsx](src/pages/PackagesPage.tsx), [PortfolioPage.tsx](src/pages/PortfolioPage.tsx),
  and [CheckoutPage.tsx](src/pages/CheckoutPage.tsx) are orphaned — nothing imports them and they
  have no route. `ResultsPage` is the live replacement for the portfolio view. `CartContext` is
  therefore only consumed by orphaned pages.
- `navigate('packages')` and `navigate('checkout')` are called from live pages but no such routes
  exist, so those CTAs silently land on the home page. Either add the routes or repoint the CTAs.
- Checkout writes `orders`/`order_items` but there is no Stripe integration; `stripe_session_id` is
  never populated.
- [marketingsite.md](marketingsite.md) is a pre-rebrand audit of the Petal Assist site. Some findings
  (legal pages, per-page meta, About page) are already addressed; treat it as historical.
  [architeture.md](architeture.md) is empty.

## Deployment

Deployed to Coolify. Two paths exist: [Dockerfile](Dockerfile) (node build → nginx serving `dist/`,
taking `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` as build args) and
[nixpacks.toml](nixpacks.toml) (`npx serve dist -l 80`). Vite inlines env vars at build time, so
changing Supabase config requires a rebuild, not a restart.
