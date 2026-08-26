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

### Routing — hash-based, hand-rolled

There is no React Router. [src/lib/router.ts](src/lib/router.ts) holds a `Route` union, a `parseHash()`
switch over `window.location.hash`, a `useRouter()` hook, and a `navigate(path)` helper that assigns
`window.location.hash`. [src/App.tsx](src/App.tsx) switches on `route.name` to pick a page component.

Adding a page means editing **three** places: the `Route` union, the `parseHash()` switch, and the
`App.tsx` switch. Miss `parseHash()` and the route silently falls through to `HomePage` — unknown
hashes have no 404, they render home.

Because it's hash routing, deep links are `/#/services`, and the nginx/serve SPA fallback in
[nginx.conf](nginx.conf) is only needed for `/` itself.

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

Tailwind with a custom brand palette in [tailwind.config.js](tailwind.config.js): `pink` (primary,
overrides Tailwind's own pink), `almond` (text/secondary), `tan` (page background), plus
`success`/`warning`/`error` and the `fade-up`/`fade-in`/`scale-in`/`float`/`shimmer` animations.

Reusable component classes live in `@layer components` in [src/index.css](src/index.css) —
`container-page`, `btn` + `btn-primary`/`btn-secondary`/`btn-outline`/`btn-ghost`, `card`/`card-hover`,
`input`, `label`, `section-title`, `section-subtitle`, `badge`. **Use these rather than re-deriving
the same utility strings**; body text color, background, and serif headings are already set globally.

Icons come from `lucide-react` only (it's excluded from Vite's `optimizeDeps`). Fonts — Inter and
Playfair Display — are linked in [index.html](index.html), not imported in CSS.

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
  [TermsPage.tsx](src/pages/TermsPage.tsx).
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
