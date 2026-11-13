# Content Preservation Report

Baseline: commit `da5a905`. Inventory: `content-inventory.md`.

## Method

1. **Automated string diff.** A script extracted every JSX text node and string literal (≥12 chars, containing a
   space, not a Tailwind class list or code) from all 22 live `.tsx` files at `da5a905` — **603 copy strings** — and
   searched for each one in the redesigned `src/` (whitespace-normalised). Orphaned pages (Packages, Portfolio,
   Checkout) were left out because only their colour classes changed.
2. **Rendered smoke test.** Every route was loaded in headless Chrome at 320 / 375 / 768 / 1024 / 1440 px, checking
   the rendered `<h1>`, horizontal overflow and console errors (105 page loads).
3. **Manual review** of the 18 strings the script flagged (below).

## Result: 585 / 603 strings found verbatim. The 18 flagged strings break down as follows

| Flagged string | Source | Status |
|---|---|---|
| "Why We Exist", "Our 5 Foundational Pillars", "What We Can Do For You", "Marketing Insights", "Common Questions", "Client Results", "What Would Better Marketing Be Worth?", "Marketing Services Built Around Business Outcomes", "Virtual Assistant Services", "Packages & Pricing" | Headings | **Preserved.** The text is unchanged but now split by a `<span className="text-highlight">` around the last phrase (the mockup's teal italic), so it no longer matches as one literal. The rendered `<h1>` text was checked in the browser. |
| "We track performance… never "set and forget."" | About › Optimize | **Preserved.** False positive: the script mis-parsed the escaped quotes. The text is unchanged in `AboutPage.tsx`. |
| "Na'ndi Hambrick — Founder, Be Virtually Assured" | About image alt | **Preserved.** It is now built from the `FOUNDER` constant and renders the same string. |
| 6 × `problems` strings ("Marketing spend that doesn't produce measurable results", "Website traffic that isn't converting into qualified leads", "No clear customer acquisition strategy", "Fragmented marketing efforts with no unified direction", "Brand positioning that doesn't differentiate you from competitors", "Social media activity that doesn't support revenue growth") | `HomePage.tsx` L9–16 | **Removed from code, not from the site.** The array was never rendered, and it caused one of the three pre-existing lint errors. The strings are kept verbatim here so they can be reinstated. |
| "Marketing strategy session" | Home hero image alt | **Changed.** The Pexels team photo was replaced in the hero by the founder photo (`public/Nandi.png`), as the mockup composition calls for. It is an image, not copy. The new alt text describes the new photo. |

## Content moved or duplicated (nothing removed)

| Content | From | Now also / instead |
|---|---|---|
| About intro and "What Sets Us Apart" | About | Also on the Home About band. One source: `src/content/company.ts` |
| 5 pillars | About | Also in the Home value strip. One source: `src/content/company.ts` |
| Founder name/title card | About | Also as a floating hero card on Home |
| Home consultation checklist | Home | Now in `CONSULTATION_POINTS`, same text |
| `hello@bevirtuallyassured.com` | Footer | Also shown on Contact |
| Services tab H1s and intros | Inside each tab | Rendered in the Services page hero. Text unchanged |

## Additions (new UI text that isn't business copy)

None of these state facts about the business, and no metrics were added.

- **Section labels (eyebrows):** "Our Services", "About Be Virtually Assured", "Our Purpose", "What Guides Us", "Our Process", "Case Studies", "Resources", "FAQ", "Legal".
- **Navigation labels:** "Home", "Contact", "Resources", "All Services" (header), "Account" (signed-in menu), "Skip to content".
- **CTA labels:** "Learn More" on homepage service cards (deep-links to the matching Services tab) and "Learn More About Us" (About band → `/about`).
- **Existing CTAs placed in new spots:** the hero buttons "Schedule A Free Consultation" and "Explore All Services". The original hero had no buttons; both labels and destinations already existed on the homepage.
- **Closing CTA on About:** uses the existing Home/Contact consultation copy.
- **Image alt text:** for the newly used `Nandi.png` and `Nandi Samone Hambrick-Day.png`.

## Formatting-only changes worth knowing

- Blog article paragraphs now use `white-space: pre-line`. Bulleted and numbered lines inside a post body now show
  on separate lines instead of running together. The text is the same.
- The Brand Strategy tab no longer shows the decorative `Layers` icon above its H1.

## Business-information issues found but left as they are (decision needed)

The brief forbids changing business information, so these were **not** touched:

1. **Privacy Policy and Terms of Service** still describe **Petal Assist**, name `hello@petalassist.com`, and refer to
   Stripe billing and Delaware law. They need legal review and rewriting.
2. **Login sign-up subcopy** says "Join Petal Assist to get matched with a dedicated assistant."
3. **The footer newsletter form** shows "You're subscribed — thanks!" but stores and sends nothing.
4. **The Dashboard "Browse Packages" button** calls `navigate('packages')`. That route doesn't exist, so it lands on Home.
5. **The LinkedIn icon** in the footer is not a link. No URL exists in the codebase.
6. **The logo** is the gold/pink "Virtually Assured Co." artwork. The mockup's teal/coral check-mark logo doesn't exist
   in the repo, so the existing logo is kept.
