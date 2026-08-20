# Petal Assist — Marketing Site Audit

## Site Overview

**Brand:** Petal Assist — Premium Virtual Assistant Services  
**Stack:** React + TypeScript, Tailwind CSS, Supabase, Vite  
**Pages:** Home, Portfolio, Packages, Login, Onboarding, Dashboard, Checkout  
**Primary CTA:** Free Consultation (lead form) → Packages → Checkout

---

## 1. Messaging & Positioning

### Strengths
- Hero headline "Reclaim your time. Grow your business." is clear and benefit-driven.
- Sub-headline names the target audience (entrepreneurs, small businesses) and the mechanism (skilled VAs).
- Stats bar (150+ clients, 12k+ hours saved, 98% satisfaction, 24h response) builds immediate social proof.
- "15+ hours saved every week, per client" floating badge reinforces the value prop visually.

### Gaps & Recommendations
| # | Issue | Recommendation |
|---|-------|----------------|
| 1 | No named niche — speaks to everyone | Add a secondary tagline or filter ("Ideal for coaches, consultants & e-commerce founders") to qualify visitors faster. |
| 2 | Stats are unverified / generic | Link stats to a short "How we measure this" tooltip or a case-study anchor to add credibility. |
| 3 | "Petal Assist" brand story is absent | Add a 2-sentence founder/origin story in the About section or footer to humanise the brand. |
| 4 | No urgency or scarcity signal | Consider "Only 3 spots open this month" or a waitlist CTA to drive faster conversions. |

---

## 2. Page-by-Page Audit

### 2.1 Home Page (`HomePage.tsx`)

**Sections present:** Hero → Services (4 cards) → Values (3 pillars) → Portfolio preview → Lead form

| Element | Status | Action |
|---------|--------|--------|
| Hero image | Stock photo (Pexels) — generic team meeting | Replace with branded photo or illustrated asset that shows a VA + client dynamic |
| Services section | 4 services listed — good coverage | Add a "See all services →" link to a dedicated Services page or anchor |
| Values section | No section heading — floats without context | Add `<h2>Why clients choose us</h2>` above the 3 pillars |
| Portfolio preview | Conditionally rendered — hidden if DB is empty | Add a static fallback with 2–3 placeholder cards so the section always appears |
| Lead form | Solid — 6 fields, service selector, success state | Add a phone/calendar booking option (Calendly embed) as an alternative CTA |
| Testimonials | **Missing entirely** | Add a testimonials/social proof section between Values and Portfolio |
| FAQ | **Missing** | Add a short FAQ (3–5 questions) above the lead form to handle objections |
| SEO meta | No `<title>` or `<meta description>` set per page | Implement per-page meta tags via a `useHead` hook or Helmet |

### 2.2 Packages Page (`PackagesPage.tsx`)

**Sections present:** Header → Pricing cards (DB-driven) → Reassurance strip → Client login CTA

| Element | Status | Action |
|---------|--------|--------|
| Pricing cards | DB-driven, popular badge, feature list — well structured | Add a comparison table toggle for users who want side-by-side view |
| Reassurance strip | 3 trust items (no contracts, rollover hours, NDA) — good | Move this strip **above** the pricing cards — it reduces friction before the price is seen |
| No testimonials | Missing on this page | Add 1–2 short quotes from clients near the pricing cards |
| No "What's included" detail | Features are bullet points only | Add a tooltip or expandable row for each feature to clarify scope |
| Cart flow | Adds to cart → navigates to checkout immediately | Consider a cart drawer/sidebar so users can add multiple packages before checking out |
| Empty state | Shows spinner then nothing if DB returns 0 packages | Add a fallback message with a contact CTA |

### 2.3 Portfolio Page (`PortfolioPage.tsx`)

**Sections present:** Header → Category filters → Project grid → Modal detail → CTA banner

| Element | Status | Action |
|---------|--------|--------|
| Category filters | Dynamic from DB — good | Pre-populate with at least 3 categories in DB seed so filters are always visible |
| Project modal | Clean — shows image, category, services, result | Add a "Book a similar project" CTA button inside the modal |
| Empty state | Shows "No projects to show yet." | Replace with a "Coming soon — check back shortly" message + lead form link |
| CTA banner | Good placement at bottom | Add a client logo strip above the CTA ("Trusted by businesses like…") |
| No SEO slugs | Projects have slugs in DB but no dedicated URLs | Consider `/portfolio/:slug` routes for SEO and shareability |

### 2.4 Navbar (`Navbar.tsx`)

| Element | Status | Action |
|---------|--------|--------|
| Links | Home, Portfolio, Packages — minimal | Add "About" or "Services" link when those pages exist |
| "Get a Free Consultation" | Not in nav | Add a pink CTA button in the nav desktop bar — highest-converting placement |
| Mobile menu | Functional | Ensure "Get a Free Consultation" is also in the mobile menu |
| Scroll behaviour | Transparent → frosted on scroll — good | — |

### 2.5 Footer (`Footer.tsx`)

| Element | Status | Action |
|---------|--------|--------|
| Social links | Instagram, LinkedIn, Facebook — all `href="#"` | Wire up to real social profile URLs |
| Contact info | Email + phone + "Remote · Worldwide" | Replace placeholder email/phone with real values before launch |
| Legal links | **Missing** | Add Privacy Policy, Terms of Service links — required for GDPR/CCPA compliance |
| Newsletter signup | **Missing** | Add a simple email capture in the footer to build a list |

---

## 3. Conversion Funnel Analysis

```
Visitor → Hero CTA → Packages → Checkout
                ↓
           Lead Form (free consultation)
```

### Funnel Gaps
1. **No email nurture entry point** — the lead form submits to Supabase but there is no confirmation email or drip sequence wired up.
2. **No testimonials anywhere** — the single biggest trust signal for a service business is absent across all pages.
3. **No About/Team page** — visitors cannot verify who they are hiring; this is a major trust gap for a VA service.
4. **No blog or content** — zero organic SEO surface area; a "Resources" or "Tips" section would drive top-of-funnel traffic.
5. **Checkout flow** — `CheckoutPage.tsx` exists but Stripe integration status is unknown; ensure payment confirmation emails are set up.

---

## 4. SEO Audit

| Item | Status | Priority |
|------|--------|----------|
| Page `<title>` tags | Not set per page | High |
| Meta descriptions | Not set | High |
| Open Graph / Twitter cards | Not set | Medium |
| Semantic HTML headings | H1 on hero, H2 on sections — mostly correct | Low |
| Image `alt` text | Present on hero and portfolio images | Low |
| Sitemap / robots.txt | Not present | Medium |
| Portfolio project URLs | No individual slugged routes | Medium |
| Core Web Vitals | Pexels image not lazy-loaded on hero | Medium |

---

## 5. Accessibility Audit

| Item | Status | Action |
|------|--------|--------|
| Social icon `aria-label` | Present — good | — |
| Cart button `aria-label` | Present — good | — |
| Form labels | All inputs have `htmlFor` — good | — |
| Color contrast | Pink-500 on white — check ratio (target ≥ 4.5:1) | Verify with contrast checker |
| Focus styles | `focus:ring` on buttons/inputs — good | — |
| Modal focus trap | Portfolio modal has no focus trap | Add focus trap for keyboard users |
| Skip-to-content link | Missing | Add for screen reader users |

---

## 6. Performance Notes

- Hero image is a full-size Pexels JPEG with no `loading="lazy"` or `fetchpriority="high"` — add `fetchpriority="high"` since it is LCP.
- Portfolio images have no lazy loading — add `loading="lazy"` to all below-fold images.
- Google Fonts loaded via `@import` in CSS — move to `<link rel="preconnect">` + `<link rel="stylesheet">` in `index.html` for faster load.

---

## 7. Priority Action List

### Must-do before launch
1. Add real contact info (email, phone, social URLs) to Footer.
2. Add Privacy Policy and Terms of Service pages + footer links.
3. Set per-page `<title>` and `<meta description>` tags.
4. Wire up post-lead-form confirmation email (Supabase Edge Function + Resend/SendGrid).
5. Add a "Get a Free Consultation" button to the Navbar.

### High impact, quick wins
6. Add a Testimonials section to HomePage between Values and Portfolio.
7. Add a section heading ("Why clients choose us") to the Values section.
8. Move the Packages reassurance strip above the pricing cards.
9. Add `loading="lazy"` to portfolio images; add `fetchpriority="high"` to hero image.
10. Replace all `href="#"` social links with real URLs.

### Growth / conversion improvements
11. Create an About/Team page to build trust.
12. Add a Calendly or similar booking embed as an alternative to the lead form.
13. Add a footer newsletter signup connected to an email marketing tool.
14. Add a blog/resources section for SEO content.
15. Implement `/portfolio/:slug` routes for individual case study pages.
