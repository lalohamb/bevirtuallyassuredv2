import { useEffect, useState, type ReactNode } from 'react';
import { ArrowRight, Check, Target, Search, Megaphone, Layers, Zap, Mail, Phone, Calendar, FileText, Users, BarChart2, Bot, Star, ShieldCheck, RefreshCw, CalendarCheck } from 'lucide-react';
import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';
import { SERVICE_TABS, type ServiceTabSlug } from '@/lib/navigation';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CallToAction } from '@/components/shared/CallToAction';
import { CardCurve, PanelArcs } from '@/components/shared/Decor';

const marketingServices = [
  {
    icon: Target,
    category: 'Marketing Strategy',
    headline: 'Build a Marketing Strategy That Actually Drives Growth',
    problem: 'Most businesses are executing marketing tactics without a coherent strategy. The result is wasted spend, inconsistent messaging, and no clear path to growth.',
    outcome: 'A clear, prioritized marketing strategy aligned to your business objectives — with a 90-day action plan you can execute immediately.',
    deliverables: [
      'Market and competitive analysis',
      'Customer segmentation and ideal client profile',
      'Positioning and differentiation strategy',
      'Go-to-market planning',
      'Marketing channel prioritization',
      '90-day growth roadmap',
    ],
    image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg',
  },
  {
    icon: Search,
    category: 'Lead Generation',
    headline: 'Fill Your Pipeline With Qualified Prospects',
    problem: "Generating leads is easy. Generating qualified leads — prospects who actually have the problem you solve and the budget to address it — is where most marketing falls short.",
    outcome: "A lead generation system that consistently delivers qualified prospects into your pipeline, with clear attribution so you know exactly what's working.",
    deliverables: [
      'Lead funnel design and build',
      'Landing page strategy and optimization',
      'Lead magnet development',
      'Conversion rate optimization',
      'Lead qualification framework',
      'Campaign strategy and management',
    ],
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
  },
  {
    icon: Megaphone,
    category: 'Digital Marketing',
    headline: 'Coordinate Your Digital Channels Into a Single Growth System',
    problem: 'Running SEO, paid ads, email, and social media as separate activities produces fragmented results. The real leverage comes from coordinating them into a unified demand-generation system.',
    outcome: 'An integrated digital marketing program where every channel reinforces the others — producing compounding results over time.',
    deliverables: [
      'SEO strategy and implementation',
      'Paid advertising (Google, Meta, LinkedIn)',
      'Email marketing and automation',
      'Content strategy and production',
      'Social media strategy',
      'Performance reporting and optimization',
    ],
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
  },
  {
    icon: Zap,
    category: 'Marketing Technology',
    headline: 'Turn Your Marketing Stack Into a Revenue-Generating Asset',
    problem: 'Most businesses have invested in marketing tools that are underutilized, poorly integrated, or producing data nobody acts on. The technology should be working for you.',
    outcome: 'A streamlined marketing technology stack with proper CRM setup, automation workflows, and analytics that give you clear visibility into pipeline and revenue.',
    deliverables: [
      'CRM audit and optimization',
      'Marketing automation setup',
      'Lead scoring and routing',
      'Analytics and attribution setup',
      'Workflow automation',
      'Martech integration and consolidation',
    ],
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
  },
];

const problems = [
  "Too many tasks, not enough hours in the day",
  "Inbox and calendar constantly out of control",
  "No bandwidth to focus on revenue-generating work",
  "Events and projects falling through the cracks",
  "Inconsistent social media and content presence",
  "Administrative work pulling you away from growth",
];

const vaPackages = [
  {
    name: 'Starter Support',
    price: '$450/mo',
    desc: 'Perfect for solopreneurs getting organized.',
    hours: '10 dedicated hours per month of dedicated virtual assistance for the essentials.',
    features: [
      '10 dedicated hours per month',
      'Email & calendar management',
      'Data entry & file organization',
      'Basic research tasks',
      'Weekly progress report',
    ],
    highlight: false,
  },
  {
    name: 'Growth Partner',
    price: '$950/mo',
    desc: 'Our most popular plan for growing businesses.',
    hours: '25 hours per month with support and expanded service coverage.',
    features: [
      '25 dedicated hours per month',
      'Everything in Starter Package',
      'Social media management',
      'Customer support inbox',
      'Invoicing & bookkeeping support',
      'Project coordination',
      'Priority response (4 business hours)',
      'Bi-weekly strategy calls',
    ],
    highlight: true,
  },
  {
    name: 'Premium Concierge',
    price: '$1,850/mo',
    desc: 'Full-scale support for established teams.',
    hours: '50 hours per month with a dedicated assistant and strategic partnership.',
    features: [
      '50 dedicated hours per month',
      'Everything in Growth Package',
      'Dedicated lead assistant',
      'Content creation & blog writing',
      'CRM management',
      'Travel & event planning',
      'Weekly strategy sessions',
    ],
    highlight: false,
  },
];

const vaServices = [
  { icon: Mail, label: 'Email & Calendar Management' },
  { icon: Phone, label: 'Customer & Phone Support' },
  { icon: FileText, label: 'Data Entry & Research' },
  { icon: Users, label: 'Social Media Management' },
  { icon: BarChart2, label: 'Basic Bookkeeping' },
  { icon: Calendar, label: 'Event Coordination Support' },
];

const trustBadges = [
  { icon: CalendarCheck, title: 'No Long-term Contracts', desc: 'Plans are month to month. Cancel or change anytime.' },
  { icon: RefreshCw, title: 'Unused Hours Roll Over', desc: 'Up to 25% of unused hours carry into the next month.' },
  { icon: ShieldCheck, title: 'Secure & Confidential', desc: 'NDAs available. Your data stays private and protected.' },
];

const eventPackages = [
  {
    eyebrow: 'Project Based',
    name: 'One-off Projects',
    sub: 'One-off projects with flexible scope.',
    price: '$750',
    priceNote: 'one-time fee',
    desc: 'A flexible engagement for specific projects without a monthly commitment.',
    features: [
      'Up to 20 hours of project hours',
      'Custom scope of work',
      'Defined deliverables',
      'Fixed timeline',
      'One-time engagement',
      '30 day support window',
    ],
    highlight: false,
  },
  {
    eyebrow: 'Event Package',
    name: 'Day of Coordination',
    sub: 'Event Planner steps in 14 days from the event date.',
    price: '$1,000',
    priceNote: 'booking fee',
    desc: 'Focused coordination support in the final stretch before your event.',
    features: [
      'Agreed upon working hours',
      'Defined scope of responsibilities',
      'Logistics & Vendor Point of Contact',
      '16 day support window (14 pre-event, 2 post-event)',
      'One-time engagement',
    ],
    highlight: true,
  },
  {
    eyebrow: 'Full Scope',
    name: 'Full Scope Event Planner',
    sub: 'One-off projects with flexible scope.',
    price: 'Price Varies',
    priceNote: '+ booking fee',
    desc: 'A contractual engagement for specific projects/events.',
    features: [
      'Project hours vary',
      'Custom scope of work',
      'Defined deliverables',
      'Fixed timeline & budget',
      'Weekly status update meetings',
      'Booking fee required & non-refundable',
    ],
    highlight: false,
  },
];

const brandDeliverables = [
  'Brand positioning and differentiation',
  'Messaging architecture',
  'Customer value proposition',
  'Brand voice and tone guidelines',
  'Competitive differentiation strategy',
  'Brand architecture (if applicable)',
];

const TAB_HERO: Record<ServiceTabSlug, { title: ReactNode; desc: string }> = {
  marketing: {
    title: <>Marketing Services Built Around <span className="text-highlight">Business Outcomes</span></>,
    desc: "Every service we offer is designed to move qualified prospects closer to becoming customers — and to give you clear visibility into what's working.",
  },
  'virtual-assistant': {
    title: <>Virtual Assistant <span className="text-highlight">Services</span></>,
    desc: 'We handle the tasks that keep your business running so you can focus on the work that grows it.',
  },
  events: {
    title: <>Event &amp; Project <span className="text-highlight">Management</span></>,
    desc: 'Flexible engagements built around your project or event — no long-term commitment required.',
  },
  brand: {
    title: <>Position Your Brand to Win the <span className="text-highlight">Right Clients</span></>,
    desc: "If your brand looks and sounds like everyone else in your market, you're competing on price. Strong positioning lets you compete on value.",
  },
};

function tabFromUrl(): ServiceTabSlug {
  const t = new URLSearchParams(window.location.search).get('tab');
  return SERVICE_TABS.some((x) => x.slug === t) ? (t as ServiceTabSlug) : 'marketing';
}

function CheckItem({ children, tone = 'teal' }: { children: ReactNode; tone?: 'teal' | 'light' }) {
  return (
    <li className={`flex items-start gap-3 text-sm leading-relaxed ${tone === 'light' ? 'text-teal-50/90' : 'text-ink-700'}`}>
      <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${tone === 'light' ? 'bg-white/15' : 'bg-teal-50'}`}>
        <Check className={`h-3 w-3 ${tone === 'light' ? 'text-coral-300' : 'text-teal-600'}`} aria-hidden="true" />
      </span>
      {children}
    </li>
  );
}

function ProblemOutcome({ problem, outcome }: { problem: string; outcome: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-cream-200 bg-cream-100 p-5">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">The Problem</p>
        <p className="text-sm leading-relaxed text-ink-700">{problem}</p>
      </div>
      <div className="rounded-2xl border border-teal-100 bg-teal-50 p-5">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">The Outcome</p>
        <p className="text-sm leading-relaxed text-ink-700">{outcome}</p>
      </div>
    </div>
  );
}

interface PriceCardProps {
  eyebrow?: string;
  name: string;
  sub?: string;
  price: string;
  priceNote?: string;
  desc: string;
  note?: string;
  features: string[];
  highlight: boolean;
}

function PriceCard({ eyebrow, name, sub, price, priceNote, desc, note, features, highlight }: PriceCardProps) {
  return (
    <div
      className={`card relative flex flex-col overflow-hidden p-7 sm:p-8 ${
        highlight ? 'border-coral-300 shadow-lift ring-2 ring-coral-200 lg:-translate-y-3' : ''
      }`}
    >
      {highlight && <CardCurve tone="coral" />}
      {highlight && (
        <span className="badge mb-4 gap-1 self-start bg-coral-50 font-semibold text-coral-700">
          <Star className="h-3 w-3" aria-hidden="true" /> Most Popular
        </span>
      )}
      {eyebrow && <span className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{eyebrow}</span>}
      <h3 className="font-serif text-2xl font-semibold">{name}</h3>
      {sub && <p className="mt-1 text-xs text-ink-500">{sub}</p>}
      <div className="mt-4 font-serif text-3xl font-semibold text-teal-700">
        {price} {priceNote && <span className="font-sans text-sm font-normal text-ink-500">{priceNote}</span>}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-600">{desc}</p>
      {note && <p className="mt-2 text-xs leading-relaxed text-ink-500">{note}</p>}
      <ul className="relative my-7 flex-grow space-y-2.5 border-t border-cream-200 pt-6">
        {features.map((f) => <CheckItem key={f}>{f}</CheckItem>)}
      </ul>
      <button onClick={() => navigate('contact')} className={`relative w-full ${highlight ? 'btn-primary' : 'btn-outline'}`}>
        Get Started
      </button>
    </div>
  );
}

export function ServicesPage() {
  const [activeTab, setActiveTab] = useState<ServiceTabSlug>(tabFromUrl);

  // Header dropdown links navigate to /services?tab=… while this page is mounted.
  useEffect(() => {
    const onPop = () => setActiveTab(tabFromUrl());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const selectTab = (slug: ServiceTabSlug) => {
    setActiveTab(slug);
    window.history.replaceState({}, '', `/services?tab=${slug}`);
  };

  const hero = TAB_HERO[activeTab];

  return (
    <>
      <PageHero eyebrow="Our Services" title={hero.title} description={<p>{hero.desc}</p>}>
        <div role="tablist" aria-label="Service categories" className="flex flex-wrap justify-center gap-2">
          {SERVICE_TABS.map((tab) => (
            <button
              key={tab.slug}
              role="tab"
              aria-selected={activeTab === tab.slug}
              onClick={() => selectTab(tab.slug)}
              className={activeTab === tab.slug ? 'pill-active' : 'pill-idle'}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </PageHero>

      {/* ── MARKETING SOLUTIONS ── */}
      {activeTab === 'marketing' && (
        <>
          <section className="section bg-white">
            <div className="container-page grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeading
                  align="left"
                  title="Does any of this sound familiar?"
                  description="Most businesses we work with are dealing with one or more of these challenges before we start working together."
                />
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {problems.map((p) => (
                    <li key={p} className="flex items-start gap-3 rounded-xl border border-cream-200 bg-cream-50 p-4 text-sm leading-relaxed text-ink-700">
                      <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-coral-500" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-deep relative overflow-hidden p-8 sm:p-10">
                <PanelArcs />
                <div className="relative">
                  <h3 className="font-serif text-2xl font-semibold !text-white sm:text-3xl">
                    These aren't marketing problems.<br />
                    <span className="italic text-coral-300">They're growth problems.</span>
                  </h3>
                  <p className="mt-4 leading-relaxed text-teal-50/90">
                    The root cause is almost always the same: activity without a coordinated
                    strategy. More content, more ads, more tools — but no unified system
                    connecting them to business outcomes.
                  </p>
                  <button
                    onClick={() => { track(Events.ASSESSMENT_STARTED, { source: 'services_problem' }); navigate('contact'); }}
                    className="btn-primary mt-7"
                  >
                    Find Out What's Holding You Back
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="section bg-cream-50">
            <div className="container-page space-y-20 lg:space-y-28">
              {marketingServices.map((s, i) => (
                <article key={s.category} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="mb-5 flex items-center gap-3">
                      <span className="icon-chip">
                        <s.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{s.category}</span>
                    </div>
                    <h2 className="font-serif text-2xl font-semibold leading-tight sm:text-[2rem]">{s.headline}</h2>
                    <div className="mt-6">
                      <ProblemOutcome problem={s.problem} outcome={s.outcome} />
                    </div>
                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {s.deliverables.map((d) => <CheckItem key={d}>{d}</CheckItem>)}
                    </ul>
                  </div>
                  <div className={`relative ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div aria-hidden="true" className={`absolute -inset-3 rounded-[32px] ${i % 2 ? 'bg-coral-50' : 'bg-teal-50'} rotate-1`} />
                    <img src={s.image} alt={s.category} className="relative h-72 w-full rounded-[28px] object-cover shadow-lift sm:h-96" loading="lazy" />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section-tight bg-white">
            <div className="container-page">
              <div className="card-cream relative grid items-center gap-10 overflow-hidden p-6 sm:p-10 lg:grid-cols-2">
                <CardCurve tone="teal" className="!h-20 !w-64" />
                <img
                  src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
                  alt="Brand Strategy"
                  className="h-64 w-full rounded-2xl object-cover shadow-soft"
                  loading="lazy"
                />
                <div className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="icon-chip bg-white">
                      <Layers className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Brand Strategy</span>
                  </div>
                  <h2 className="font-serif text-2xl font-semibold sm:text-3xl">Position Your Brand to Win the Right Clients</h2>
                  <p className="mt-3 leading-relaxed text-ink-600">
                    If your brand looks and sounds like everyone else in your market, you're competing on price. Strong positioning lets you compete on value.
                  </p>
                  <button onClick={() => navigate('branding')} className="btn-primary mt-6">
                    Explore Branding Strategy <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="section-tight bg-white pb-[var(--section-spacing)]">
            <div className="container-page">
              <CallToAction
                contained
                variant="deep"
                eyebrow={<span className="inline-flex items-center gap-2"><BarChart2 className="h-4 w-4" aria-hidden="true" />Marketing ROI Calculator</span>}
                title="What would better marketing be worth to your business?"
                description="Enter your current numbers and see the revenue opportunity sitting in your existing marketing. Takes less than 2 minutes."
                actions={
                  <button
                    onClick={() => { track(Events.CALCULATOR_STARTED, { source: 'services' }); navigate('calculator'); }}
                    className="btn-primary"
                  >
                    Calculate My Revenue Opportunity <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                }
              />
            </div>
          </section>
        </>
      )}

      {/* ── VIRTUAL ASSISTANT ── */}
      {activeTab === 'virtual-assistant' && (
        <>
          <section className="section-tight bg-white">
            <div className="container-page">
              <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3">
                {vaServices.map(({ icon: Icon, label }) => (
                  <div key={label} className="card flex items-center gap-4 p-5">
                    <span className="icon-chip">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="font-medium text-navy">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section bg-cream-100">
            <div className="container-page">
              <SectionHeading title={<>Packages &amp; <span className="text-highlight">Pricing</span></>} />
              <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
                {vaPackages.map((pkg) => (
                  <PriceCard
                    key={pkg.name}
                    name={pkg.name}
                    price={pkg.price}
                    desc={pkg.desc}
                    note={pkg.hours}
                    features={pkg.features}
                    highlight={pkg.highlight}
                  />
                ))}
              </div>

              <div className="mt-12 grid gap-4 md:grid-cols-3">
                {trustBadges.map((b) => (
                  <div key={b.title} className="flex items-start gap-4 rounded-2xl border border-teal-100 bg-teal-50 p-5">
                    <b.icon className="mt-0.5 h-6 w-6 flex-shrink-0 text-teal-600" strokeWidth={1.75} aria-hidden="true" />
                    <div>
                      <div className="font-semibold text-navy">{b.title}</div>
                      <div className="mt-1 text-sm leading-relaxed text-ink-600">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section bg-white">
            <div className="container-page">
              <div className="card-deep relative overflow-hidden p-8 sm:p-12 lg:p-14">
                <PanelArcs />
                <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
                  <div>
                    <span className="badge gap-2 bg-white/10 px-4 py-1.5 text-sm text-teal-50">
                      <Bot className="h-4 w-4" aria-hidden="true" />
                      AI-Powered Support
                    </span>
                    <h2 className="section-title mt-5 !text-white">Meet Your AI Business Assistant</h2>
                    <p className="mt-4 text-lg leading-relaxed text-teal-50/90">
                      We combine the warmth of a dedicated human VA with the speed and
                      precision of AI-powered tools — giving your business a competitive
                      edge without the overhead.
                    </p>
                    <ul className="mt-6 space-y-3">
                      {[
                        'AI-assisted email drafting & responses',
                        'Smart scheduling & calendar optimization',
                        'Automated research & data summaries',
                        'Content drafts ready for your review',
                        'Workflow automation setup & management',
                      ].map((item) => <CheckItem key={item} tone="light">{item}</CheckItem>)}
                    </ul>
                    <button onClick={() => navigate('contact')} className="btn-primary mt-8">
                      Learn More <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div aria-hidden="true" className="hidden justify-center lg:flex">
                    <div className="flex h-56 w-56 items-center justify-center rounded-full border border-white/20 bg-white/5">
                      <div className="flex h-36 w-36 items-center justify-center rounded-full bg-teal-600/60">
                        <Bot className="h-20 w-20 text-coral-300" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── EVENT & PROJECT MANAGEMENT ── */}
      {activeTab === 'events' && (
        <section className="section bg-cream-100">
          <div className="container-page">
            <div className="grid items-start gap-6 lg:grid-cols-3">
              {eventPackages.map((p) => <PriceCard key={p.name} {...p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── BRAND STRATEGY ── */}
      {activeTab === 'brand' && (
        <>
          <section className="section bg-white">
            <div className="container-page">
              <ProblemOutcome
                problem="Most businesses sound like their competitors. Without a clear, differentiated position, you're forced to compete on price instead of value — and that's a race to the bottom."
                outcome="A clear brand position, differentiated messaging, and a customer value proposition that resonates with your ideal clients and justifies premium pricing."
              />
              <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
                <img
                  src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
                  alt="Brand Strategy"
                  className="h-80 w-full rounded-[28px] object-cover shadow-lift"
                  loading="lazy"
                />
                <div>
                  <h2 className="section-title">What's Included</h2>
                  <ul className="mt-6 space-y-3">
                    {brandDeliverables.map((d) => <CheckItem key={d}>{d}</CheckItem>)}
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-white pb-[var(--section-spacing)]">
            <div className="container-page">
              <CallToAction
                contained
                variant="deep"
                title="Ready to differentiate your brand?"
                description="Let's build a brand position that attracts the right clients and lets you compete on value — not price."
                actions={
                  <>
                    <button
                      onClick={() => { track(Events.CONSULTATION_STARTED, { source: 'branding_cta' }); navigate('contact'); }}
                      className="btn-primary"
                    >
                      Get Started <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => { track(Events.CALCULATOR_STARTED, { source: 'branding' }); navigate('calculator'); }}
                      className="btn-outline-light"
                    >
                      Try the ROI Calculator
                    </button>
                  </>
                }
              />
            </div>
          </section>
        </>
      )}
    </>
  );
}
