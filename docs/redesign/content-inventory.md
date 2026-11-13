# Content Inventory (pre-redesign)

Source of truth for the content-preservation check. Line numbers refer to commit `da5a905`.
"Block" = a contiguous piece of user-visible copy or a data array rendered as copy.
IDs are referenced from `homepage-mapping.md` and `content-preservation-report.md`.

## Global — `src/components/Navbar.tsx`

| ID | Block | Source |
|---|---|---|
| NAV-1 | Logo image (`/virtually_assured_horizontal_logo.png`, alt "Be Virtually Assured") → Home | L43–50 |
| NAV-2 | Links: About, Services, Blog | L8–12 |
| NAV-3 | "Free Consultation" button → `/contact` (CONSULTATION_STARTED, source navbar) | L71–76 |
| NAV-4 | Signed-out: "Client Login" → `/login` | L87–90 |
| NAV-5 | Signed-in: "Admin" (admin only), "Dashboard", "Sign Out" | L78–86 |

## Global — `src/components/Footer.tsx`

| ID | Block | Source |
|---|---|---|
| FT-1 | Inverted logo | L37–39 |
| FT-2 | Brand blurb "We assist with the tasks you find mundane or complex…measurable, repeatable growth." | L40–42 |
| FT-3 | Social: Instagram (link), Facebook (link), LinkedIn (icon, no link) | L43–67 |
| FT-4 | "Explore" list: Home, Services, Results, Blog, About, ROI Calculator, Free Assessment, FAQ, Contact Us | L70–96 |
| FT-5 | "Get in Touch" + `hello@bevirtuallyassured.com` mailto | L99–107 |
| FT-6 | "Marketing Growth Tips" / "Practical strategies for business growth, delivered monthly." + newsletter form + "You're subscribed — thanks!" | L109–113, L5–29 |
| FT-7 | Buttons "Schedule Consultation", "Free Marketing Assessment" | L115–128 |
| FT-8 | "© {year} Be Virtually Assured. All rights reserved." + Privacy Policy, Terms of Service | L132–138 |

## Home — `src/pages/HomePage.tsx`

| ID | Block | Source |
|---|---|---|
| H-1 | Eyebrow pill "Premium Small Business Services" | L47–50 |
| H-2 | H1 "Turn Your Business Into A / Growth Machine." | L52–55 |
| H-3 | Hero paragraph "We assist with the tasks you find mundane or complex, so that you can focus on more revenue generating activities. Let's get connected…measurable, repeatable growth." | L56–58 |
| H-4 | Hero image (Pexels 3184292, alt "Marketing strategy session") | L64–70 |
| H-5 | Floating card "Measurable outcomes" / "Strategy tied to business results" | L73–81 |
| H-6 | H2 "What We Can Do For You" | L90 |
| H-7 | Services intro "From marketing strategy, email and calendar management…keep your business running." | L91–93 |
| H-8 | 4 service cards (`services` array): Marketing Strategy, Virtual Admin Support, Event Coordination, Project Management — titles + descriptions verbatim | L18–23 |
| H-9 | Button "Explore All Services" → `/services` (SERVICES_VIEWED) | L111–117 |
| H-10 | Badge "Marketing ROI Calculator" | L125–128 |
| H-11 | H2 "What would better marketing be worth to your business?" | L129–131 |
| H-12 | "Enter your current numbers and see the revenue opportunity…Takes less than 2 minutes." | L132–135 |
| H-13 | Buttons "Calculate My Revenue Opportunity" → `/calculator`, "Schedule A Free Consultation" → `/contact` | L136–150 |
| H-14 | Badge "Let's build your growth system" | L160–163 |
| H-15 | H2 "Schedule A Free Consultation" | L164–166 |
| H-16 | "Tell us about your business and your growth objectives. We'll review your situation and come prepared with specific observations and recommendations." | L167–170 |
| H-17 | Checklist ×4: "No commitment — the consultation is completely free" / "We review your current marketing before the call" / "You leave with at least one actionable insight" / "No generic pitch — specific to your business" | L172–182 |
| H-18 | "Prefer to start with the assessment? Take our free marketing assessment first…" + button "Take the Free Assessment First" | L184–193 |
| H-19 | `<LeadForm />` | L195 |
| H-20 | `problems` array (6 strings) — **defined, never rendered** | L9–16 |

## Lead form — `src/components/LeadForm.tsx`

| ID | Block | Source |
|---|---|---|
| LF-1 | Fields: Full Name*, Email*, Business Name*, Website, Phone*, Industry* (11 options), Brief Summary* + placeholders | L8–20, L89–131 |
| LF-2 | Submit "Schedule A Free Consultation" / "Sending…"; footnote "No commitment. We'll reach out within one business day." | L135–142 |
| LF-3 | Success: "Request received!" + body + "Send another request"; error message | L64–79, L133 |

## About — `src/pages/AboutPage.tsx`

| ID | Block | Source |
|---|---|---|
| A-1 | H1 "What Sets Us Apart" | L26–28 |
| A-2 | Intro "At Virtually Assured, we are committed to helping you succeed…that make a difference." | L29–31 |
| A-3 | Image `/about-hero.png` + caption card "Na'ndi Hambrick" / "Founder & CEO" | L35–45 |
| A-4 | H2 "Why We Exist" + 3 paragraphs | L52–67 |
| A-5 | H2 "Our 5 Foundational Pillars" + 5 pillars (Proactive Ownership, Agile Adaptability, Bold Creativity, Efficient Execution, Collaborative Synergy) w/ descriptions | L3–9, L75–88 |
| A-6 | H2 "How We Work" + subtitle "A disciplined four-step process…" + 4 steps (Assess, Strategize, Execute, Optimize) | L11–16, L94–108 |

## Services — `src/pages/ServicesPage.tsx`

| ID | Block | Source |
|---|---|---|
| S-1 | Tab labels: Marketing Solutions, Virtual Assistant, Event & Project Management, Brand Strategy | L141 |
| S-2 | Marketing H1 "Marketing Services Built Around Business Outcomes" + intro | L172–178 |
| S-3 | "Does any of this sound familiar?" + subtitle + 6 problems (`problems`, VA-flavoured) | L73–80, L185–198 |
| S-4 | Card "These aren't marketing problems. / They're growth problems." + body + button "Find Out What's Holding You Back" → `/contact` | L200–217 |
| S-5 | 4 marketing services (`marketingServices`): category, headline, problem, outcome, 6 deliverables, image each | L6–71 |
| S-6 | Brand Strategy teaser card + "Explore Branding Strategy" → `/branding` | L262–289 |
| S-7 | ROI CTA (badge, H2, body, "Calculate My Revenue Opportunity") | L292–313 |
| S-8 | VA H1 "Virtual Assistant Services" + intro | L321–327 |
| S-9 | 6 VA service chips (`vaServices`) | L132–139 |
| S-10 | "Packages & Pricing" + 3 packages (Starter Support $450/mo, Growth Partner $950/mo "Most Popular", Premium Concierge $1,850/mo) with desc, hours, features, "Get Started" | L82–130, L343–378 |
| S-11 | 3 trust badges (No Long-term Contracts, Unused Hours Roll Over, Secure & Confidential) | L381–395 |
| S-12 | AI band: "AI-Powered Support", "Meet Your AI Business Assistant", body, 5 bullets, "Learn More" | L399–438 |
| S-13 | Events H1 "Event & Project Management" + intro | L446–451 |
| S-14 | 3 event cards: One-off Projects ($750), Day of Coordination ($1,000, Most Popular), Full Scope Event Planner (Price Varies) — all sub-copy + bullets + "Get Started" | L454–533 |
| S-15 | Brand H1 "Position Your Brand to Win the Right Clients" + intro | L544–549 |
| S-16 | Brand Problem / Outcome boxes | L552–561 |
| S-17 | Brand image + "What's Included" + 6 deliverables | L563–593 |
| S-18 | Brand CTA "Ready to differentiate your brand?" + body + "Get Started", "Try the ROI Calculator" | L595–616 |

## Branding — `src/pages/BrandingPage.tsx`

| ID | Block | Source |
|---|---|---|
| B-1 | Eyebrow "Brand Strategy", H1, intro | L20–32 |
| B-2 | Problem / Outcome boxes (Problem text duplicates intro) | L34–47 |
| B-3 | Image + "What's Included" + 6 deliverables + "Schedule A Free Consultation" | L50–78 |
| B-4 | CTA "Ready to differentiate your brand?" + body + "Get Started", "View All Services" | L81–104 |

## Contact — `src/pages/ContactPage.tsx`

| ID | Block | Source |
|---|---|---|
| C-1 | Eyebrow "Free Strategy Consultation" | L13–16 |
| C-2 | H1 "Schedule A Free Consultation" + intro paragraph | L17–24 |
| C-3 | Checklist ×5 (incl. "Typically 45–60 minutes via video call") | L25–39 |
| C-4 | "What happens after you submit?" + 4 numbered steps | L40–48 |
| C-5 | "Not ready for a call yet?…" + "Take the Free Assessment First" | L50–60 |
| C-6 | `<LeadForm />` | L63 |

## FAQ — `src/pages/FAQPage.tsx`

| ID | Block | Source |
|---|---|---|
| F-1 | H1 "Common Questions" + "Everything you need to know before getting started." | L23–24 |
| F-2 | 6 Q&A pairs | L6–13 |
| F-3 | "Still have questions?" + body + "Schedule A Free Consultation", "Take the Free Assessment" | L49–67 |

## Results — `src/pages/ResultsPage.tsx`

| ID | Block | Source |
|---|---|---|
| R-1 | H1 "Client Results" + intro | L83–87 |
| R-2 | Placeholder disclaimer box | L88–90 |
| R-3 | Category filter pills; case cards (badge, title, summary, "Read case study") | L93–143 |
| R-4 | 3 placeholder cases (DB fallback) | L7–50 |
| R-5 | CTA "Ready to build your own growth story?" + body + 2 buttons | L145–157 |
| R-6 | Modal: The Challenge, Services Applied, Result, "Get a Similar Strategy for Your Business" | L160–219 |

## Blog — `src/pages/BlogPage.tsx`

| ID | Block | Source |
|---|---|---|
| BL-1 | H1 "Marketing Insights" + intro | L98–102 |
| BL-2 | Featured post card + grid cards (category, title, summary, date, read time) | L110–167 |
| BL-3 | 3 fallback posts (full bodies) | L6–40 |
| BL-4 | Article view: "← Back to Blog", badge, H1, meta, image, body paragraphs | L59–81 |
| BL-5 | Article CTA "Need help identifying your biggest marketing opportunity?" + body + button | L82–88 |

## Assessment — `src/pages/AssessmentPage.tsx`

| ID | Block | Source |
|---|---|---|
| AS-1 | Intro: badge, H1 "Find Out What's Holding Your Marketing Back", body, 4 bullets, "Start My Free Assessment" | L155–192 |
| AS-2 | 8 questions + all option lists | L25–52, L106–115 |
| AS-3 | Progress, Back/Next/"See My Results" | L197–256 |
| AS-4 | Capture: "Your results are ready", body, 4 fields, submit, footnote | L261–300 |
| AS-5 | Results: score, "out of 100", disclaimer, 5 area cards + notes, "Want a Personalized 90-Day Growth Strategy?" CTA | L304–352, L54–83 |

## Calculator — `src/pages/CalculatorPage.tsx`

| ID | Block | Source |
|---|---|---|
| CA-1 | Badge, H1 "What Would Better Marketing Be Worth?", intro, disclaimer | L62–79 |
| CA-2 | Start button "Calculate My Revenue Opportunity" | L81–90 |
| CA-3 | Inputs (4 sliders + target) and labels | L93–144 |
| CA-4 | Results: Current/Improved Monthly, Annual Revenue Opportunity, CAC cards | L146–181 |
| CA-5 | CTA "Let's Identify Your Highest-Value Growth Opportunity" + body + "Book a Strategy Consultation" | L183–196 |

## Legal — `src/pages/PrivacyPage.tsx`, `src/pages/TermsPage.tsx`

| ID | Block | Source |
|---|---|---|
| P-1 | Privacy H1, "Last updated: February 1, 2025", sections 1–9 (Petal Assist copy, `hello@petalassist.com`) | Privacy L5–102 |
| T-1 | Terms H1, "Last updated: February 1, 2025", sections 1–11 (Petal Assist copy) | Terms L5–112 |

## Account area

| ID | Block | Source |
|---|---|---|
| L-1 | Login: heading, subcopy (incl. "Join Petal Assist…"), Sign In/Sign Up toggle, form, notices, links | `LoginPage.tsx` L55–159 |
| O-1 | Onboarding: all steps/fields/success screen | `OnboardingPage.tsx` |
| D-1 | Dashboard: header, onboarding nudge, profile, plan, orders | `DashboardPage.tsx` |
| AD-1 | Admin: leads table, blog CMS | `AdminPage.tsx` |

## Orphaned pages (unrouted, unchanged in content)

`PackagesPage.tsx`, `PortfolioPage.tsx`, `CheckoutPage.tsx`.
