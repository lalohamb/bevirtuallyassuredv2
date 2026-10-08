# BVA Site Change Report
_Source: BVA Bolt Commands.docx_

---

## Legend
- ✅ Done — complete, verified build passes
- 🔲 Pending — has unresolved dependencies
- ⚠️ Blocked — missing asset or external action required

---

## 🏠 HOME PAGE

---

### #1 — Logo text: "Petal Assist" → "Be Virtually Assured Co."
- **Status:** ✅ Done — already correct
- **File:** `src/components/Navbar.tsx`

---

### #2 — Site-wide: all "Petal Assist" → "Be Virtually Assured"
- **Status:** ✅ Done — no remaining instances
- **Files:** All `.tsx` files

---

### #3 — Replace TrendingUp circle icon with uploaded logo (transparent PNG)
- **Status:** ✅ Done
- **Files:** `src/components/Navbar.tsx`, `src/components/Footer.tsx`
- **Change:** Copied `Elegant Gold and Pink V-A Monogram.png` to `public/logo.png`. Replaced gradient circle + TrendingUp icon with `<img src="/logo.png" />` in both Navbar and Footer.

---

### #4 — Add "Contact Us" tab to navbar
- **Status:** ✅ Done
- **File:** `src/components/Navbar.tsx`
- **Change:** Added `{ label: 'Contact Us', path: 'contact' }` to links array

---

### #5 — Rename "Results" page → "Portfolio"
- **Status:** ✅ Done
- **Files:** `src/lib/router.ts`, `src/App.tsx`
- **Change:** Added `portfolio` route to router and mapped it to `ResultsPage` in App.tsx. Both `#/results` and `#/portfolio` resolve to the same page.

---

### #6 — Hide Portfolio page until further notice
- **Status:** ✅ Done
- **Files:** `src/components/Navbar.tsx`, `src/components/Footer.tsx`
- **Change:** Portfolio is not present in Navbar links or Footer Explore list. Route and page file remain intact for when it's ready to go live.

---

### #7 — Remove "Insights" tab from navbar
- **Status:** ✅ Done
- **File:** `src/components/Navbar.tsx`
- **Change:** Removed `{ label: 'Insights', path: 'blog' }` from links array

---

### #8 — Keep Calculator, Services, About Us tabs
- **Status:** ✅ Done — all present
- **File:** `src/components/Navbar.tsx`

---

### #9 — Badge text → "Premium Small Business Services"
- **Status:** ✅ Done
- **File:** `src/pages/HomePage.tsx`

---

### #10 — Hero h1: "Turn Your Marketing Into A" → "Turn Your Business Into A"
- **Status:** ✅ Done
- **File:** `src/pages/HomePage.tsx`

---

### #11 — Hero h1: "Growth Engine" → "Growth Machine"
- **Status:** ✅ Done
- **File:** `src/pages/HomePage.tsx`

---

### #12 — Replace hero descriptive paragraph with new copy
- **Status:** ✅ Done
- **File:** `src/pages/HomePage.tsx`

---

### #13 — Replace all "Book A Strategy Call" → "Schedule A Free Consultation" (site-wide)
- **Status:** ✅ Done
- **Files:** `src/pages/HomePage.tsx`, `src/pages/ContactPage.tsx`, `src/components/Navbar.tsx`, `src/components/LeadForm.tsx`

---

### #14 — "What We Can Do For You" — replace section heading and subtitle
- **Status:** ✅ Done
- **File:** `src/pages/HomePage.tsx`
- **Change:** Heading updated to "What We Can Do For You", subtitle updated with new copy

---

### #15 — Keep hero image
- **Status:** ✅ Done — no change needed

---

### #16 — Remove problem section from Home; move to Services/Marketing page
- **Status:** ✅ Done
- **Files:** `src/pages/HomePage.tsx`, `src/pages/ServicesPage.tsx`
- **Change:** Problem section removed from HomePage. Rebuilt inside Marketing Solutions tab in ServicesPage with updated copy.

---

### #17 — "How we help you grow" — replace descriptive subtitle
- **Status:** ✅ Done
- **File:** `src/pages/HomePage.tsx`
- **Note:** Section heading was also updated to "What We Can Do For You" per #14

---

### #18 — Replace 6 service cards with 4 new ones
- **Status:** ✅ Done
- **File:** `src/pages/HomePage.tsx`
- **Change:** Replaced services array with Marketing Strategy, Virtual Admin Support, Event Coordination, Project Management. Grid updated to `sm:grid-cols-2`.

---

### #19 — Remove "WHO WE WORK WITH" section
- **Status:** ✅ Done
- **File:** `src/pages/HomePage.tsx`
- **Change:** Entire "Who we work with" section removed

---

### #20 — Move ROI Calculator CTA to Services/Marketing page
- **Status:** ✅ Done
- **Files:** `src/pages/HomePage.tsx`, `src/pages/ServicesPage.tsx`
- **Change:** ROI Calculator CTA moved from HomePage into the Marketing Solutions tab in ServicesPage.

---

### #21 — Move FAQ section to Contact Us page
- **Status:** ✅ Done
- **Files:** `src/pages/HomePage.tsx`, `src/pages/ContactPage.tsx`
- **Change:** Removed FAQ section and `faqs` array from HomePage. Added FAQ accordion to bottom of ContactPage with `useState` openFaq pattern and ChevronUp/Down icons.

---

### #22 — Remove Fractional CMO FAQ question
- **Status:** ✅ Done
- **File:** `src/pages/HomePage.tsx`
- **Change:** Deleted the Fractional CMO FAQ entry from the faqs array

---

### #23 — Remove all "Fractional CMO" mentions site-wide
- **Status:** ✅ Done
- **Files:** `src/pages/HomePage.tsx` (via #18/#22), `src/pages/ServicesPage.tsx` (via #37), `src/pages/BlogPage.tsx`
- **Change:** Fractional CMO blog post removed from FALLBACK_POSTS

---

## 👤 ABOUT PAGE

---

### #24 — Replace founder photo
- **Status:** ⚠️ Blocked
- **File:** `src/pages/AboutPage.tsx`
- **Missing:** New photo asset from client. Once provided: place in `public/`, update `src` attribute on the `<img>` tag.

---

### #25 — Caption: "Founder & Lead Strategist" → "Founder & CEO"
- **Status:** ✅ Done
- **File:** `src/pages/AboutPage.tsx`

---

### #26 — Replace h1 with "What Sets Us Apart"
- **Status:** ✅ Done
- **File:** `src/pages/AboutPage.tsx`

---

### #27 — Replace intro paragraph with new copy
- **Status:** ✅ Done
- **File:** `src/pages/AboutPage.tsx`

---

### #28 — Edit "Why We Exist" section with updated copy
- **Status:** ✅ Done
- **File:** `src/pages/AboutPage.tsx`

---

### #29 — Remove entire "What We Don't Do" section
- **Status:** ✅ Done
- **File:** `src/pages/AboutPage.tsx`

---

### #30 — Remove assessment and consultation buttons from About CTA
- **Status:** ✅ Done
- **File:** `src/pages/AboutPage.tsx`
- **Change:** Entire CTA card removed along with buttons

---

### #31 — Add 5 Foundational Pillars section
- **Status:** ✅ Done
- **File:** `src/pages/AboutPage.tsx`
- **Change:** New pillars section added with all 5 entries in a card grid

---

## 🛠️ SERVICES PAGE

---

### #32 — Create tab navigation: Marketing Solutions | Virtual Assistant | Event & Project Management
- **Status:** ✅ Done
- **File:** `src/pages/ServicesPage.tsx`
- **Change:** Three-tab switcher built with `useState`. Each tab renders its own content panel.

---

### #33 — Move current services content under "Marketing Solutions" tab
- **Status:** ✅ Done
- **File:** `src/pages/ServicesPage.tsx`
- **Change:** All 5 marketing service cards wrapped inside Marketing Solutions tab. Problem section and ROI Calculator also included.

---

### #34 — VA tab — display packages and pricing
- **Status:** ✅ Done ⚠️ Pricing placeholder
- **File:** `src/pages/ServicesPage.tsx`
- **Change:** VA tab built with Starter / Growth / Premium package cards. Pricing shows "Starting at $X/mo" — **client must confirm actual pricing before publishing.**

---

### #35 — Add "AI Business Assistant" section
- **Status:** ✅ Done ⚠️ Copy placeholder
- **File:** `src/pages/ServicesPage.tsx`
- **Change:** AI Business Assistant section added inside VA tab with dark gradient card, feature list, and Bot icon. **Client should confirm specific AI tools/services offered before publishing.**

---

### #36 — Event & Project Management tab — leave blank placeholder
- **Status:** ✅ Done
- **File:** `src/pages/ServicesPage.tsx`
- **Change:** Tab renders a "coming soon" placeholder with a Contact Us CTA button.

---

### #37 — Remove Fractional CMO service card
- **Status:** ✅ Done
- **File:** `src/pages/ServicesPage.tsx`
- **Change:** Fractional CMO entry removed from services array; unused `Users` import removed

---

## 📞 CONTACT US PAGE

---

### #38 — Insert photo on Contact page
- **Status:** ⚠️ Blocked
- **File:** `src/pages/ContactPage.tsx`
- **Missing:** Image asset from client. Once provided: place in `public/`, add `<img>` in left column above or below the checklist.

---

### #39 — Simplify contact form fields
- **Status:** ✅ Done
- **File:** `src/components/LeadForm.tsx`
- **Change:** Rebuilt form with: Full Name, Email, Business Name, Website, Phone, Industry (dropdown), Brief Summary. Removed old challenge/goals fields.

---

### #40 — Move FAQ section to Contact Us page
- **Status:** ✅ Done — completed as part of #21
- **Files:** `src/pages/ContactPage.tsx`, `src/pages/HomePage.tsx`

---

## 🦶 FOOTER

---

### #41 — Footer brand name already correct
- **Status:** ✅ Done

---

### #42 — Update footer descriptive text
- **Status:** ✅ Done
- **File:** `src/components/Footer.tsx`

---

### #43 — Remove "Results" and "Insights" from footer Explore links
- **Status:** ✅ Done
- **File:** `src/components/Footer.tsx`
- **Change:** Removed Results, Insights, and Free Assessment from Explore list. Added Contact Us.

---

### #44 — Link Instagram icon to BVA Instagram URL
- **Status:** ✅ Done
- **File:** `src/components/Footer.tsx`

---

### #45 — LinkedIn icon — remove link
- **Status:** ✅ Done
- **File:** `src/components/Footer.tsx`
- **Change:** LinkedIn converted from `<a>` to `<span>` — renders visually but has no href

---

### #46 — Link Facebook icon to BVA Facebook URL
- **Status:** ✅ Done
- **File:** `src/components/Footer.tsx`

---

### #47 — Footer email already correct
- **Status:** ✅ Done

---

### #48 — Remove phone number from footer
- **Status:** ✅ Done
- **File:** `src/components/Footer.tsx`
- **Change:** Phone `<li>` block removed; `Phone` icon import removed

---

## 🗄️ DATABASE & OTHER

---

### #49 — Client onboarding database schema
- **Status:** 🔲 Pending
- **Files:** `supabase/migrations/` (new file), `src/pages/DashboardPage.tsx`, `src/pages/OnboardingPage.tsx`
- **Plan:** New migration adding `client_profiles`, `marketing_plans`, `client_documents`, `payment_history` tables. Update DashboardPage to display per-client data.
- **Dependency:** Requires active Supabase project; `payment_history` depends on #52

---

### #50 — Build VA Discovery Call Intake Form
- **Status:** 🔲 Pending
- **Files:** New `src/pages/IntakePage.tsx`, `src/lib/router.ts`, `src/App.tsx`
- **Plan:** New page at `#/intake` with all fields from doc (Full Name, Company, Email, Phone, Website, Social Handles, 4 textarea questions, services checklist, VA experience, budget, timeline, how heard, calendar embed). Submits to Supabase `leads` table.
- **Dependency:** Requires #51 for email notification; calendar embed requires external booking tool (Calendly or similar)

---

### #51 — Lead notifications via email only
- **Status:** 🔲 Pending
- **Files:** New Supabase Edge Function or DB trigger
- **Plan:** On `leads` INSERT, send email to `hello@bevirtuallyassured.com`. No SMS, no phone. Recommended: Resend (free tier) + Supabase Edge Function.
- **Dependency:** Requires Supabase project access + email provider API key

---

### #52 — Stripe payment setup
- **Status:** ⚠️ Blocked
- **File:** `src/pages/CheckoutPage.tsx` (when ready)
- **Missing:** Client must complete Stripe account setup at stripe.com first. Then: add `VITE_STRIPE_PUBLISHABLE_KEY` to `.env`, add secret key to Supabase Edge Function secrets (never in frontend). Build checkout flow after VA packages (#34) are defined.
- **Dependency:** Requires client Stripe setup + #34

---

## 📊 Progress Summary

| Status | Count |
|--------|-------|
| ✅ Done | 43 |
| 🔲 Pending (has dependencies) | 2 |
| ⚠️ Blocked (needs asset/external action) | 3 |
| **Total** | **52** |

---

## 🔗 Remaining Dependency Chain

```
#5  → #6               rename Results → hide Portfolio
#22 ✅ → #21 → #40     FAQ: remove CMO Q (done) → move from Home → add to Contact
#32 → #33 → #16 → #20  Services tabs → move problem section + ROI calc
#32 → #34 → #52        Services tabs → VA packages → Stripe
#32 → #35              Services tabs → AI section
#32 → #36              Services tabs → Event tab placeholder
#50 → #51              Intake form → email notification
#49 → #52              DB schema → payment history
```

**Next unblocked items ready to implement:**
- #5 + #6 — Rename Results → Portfolio, then hide it
- #40 — Move FAQ to Contact page (#22 is already done)
- #32 — Services page tab structure (unlocks #33, #34, #35, #36, #16, #20)
