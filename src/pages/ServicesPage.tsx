import { useState } from 'react';
import { ArrowRight, Check, Target, Search, Megaphone, Layers, Zap, Mail, Phone, Calendar, FileText, Users, BarChart2, Bot, Star } from 'lucide-react';
import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';

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
    icon: Layers,
    category: 'Brand Strategy',
    headline: 'Position Your Brand to Win the Right Clients',
    problem: "If your brand looks and sounds like everyone else in your market, you're competing on price. Strong positioning lets you compete on value.",
    outcome: 'A clear brand position, differentiated messaging, and a customer value proposition that resonates with your ideal clients and justifies premium pricing.',
    deliverables: [
      'Brand positioning and differentiation',
      'Messaging architecture',
      'Customer value proposition',
      'Brand voice and tone guidelines',
      'Competitive differentiation strategy',
      'Brand architecture (if applicable)',
    ],
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
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

const tabs = ['Marketing Solutions', 'Virtual Assistant', 'Event & Project Management'] as const;
type Tab = typeof tabs[number];

export function ServicesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Marketing Solutions');

  return (
    <div className="pt-28 pb-20">
      <div className="container-page">

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'bg-white border border-almond-200 text-almond-600 hover:border-pink-300 hover:text-pink-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── MARKETING SOLUTIONS ── */}
        {activeTab === 'Marketing Solutions' && (
          <div>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h1 className="font-serif text-4xl sm:text-5xl text-almond-900 mb-4">
                Marketing Services Built Around Business Outcomes
              </h1>
              <p className="text-almond-600 text-lg leading-relaxed">
                Every service we offer is designed to move qualified prospects closer to
                becoming customers — and to give you clear visibility into what's working.
              </p>
            </div>

            {/* Problem section */}
            <div className="mb-20 py-16 bg-white border-y border-almond-100 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="section-title mb-4">Does any of this sound familiar?</h2>
                  <p className="section-subtitle mb-8">
                    Most businesses we work with are dealing with one or more of these challenges before we start working together.
                  </p>
                  <ul className="space-y-3">
                    {problems.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-almond-700">
                        <span className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-pink-500 block" />
                        </span>
                        <span className="text-sm leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card p-8 bg-gradient-to-br from-pink-50 to-tan-50 border-pink-100">
                  <h3 className="font-serif text-2xl text-almond-900 mb-4">
                    These aren't marketing problems.<br />
                    <span className="text-pink-600">They're growth problems.</span>
                  </h3>
                  <p className="text-almond-600 leading-relaxed mb-6">
                    The root cause is almost always the same: activity without a coordinated
                    strategy. More content, more ads, more tools — but no unified system
                    connecting them to business outcomes.
                  </p>
                  <button
                    onClick={() => { track(Events.ASSESSMENT_STARTED, { source: 'services_problem' }); navigate('contact'); }}
                    className="btn-primary"
                  >
                    Find Out What's Holding You Back
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Services list */}
            <div className="space-y-20">
              {marketingServices.map((s, i) => (
                <div
                  key={s.category}
                  className="grid lg:grid-cols-2 gap-12 items-center animate-fade-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-5">
                      <s.icon className="w-6 h-6 text-pink-600" />
                    </div>
                    <span className="text-xs font-semibold text-pink-500 uppercase tracking-widest mb-2 block">{s.category}</span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-almond-900 mb-4">{s.headline}</h2>
                    <div className="mb-4 p-4 rounded-xl bg-almond-50 border border-almond-100">
                      <p className="text-xs font-semibold text-almond-500 uppercase tracking-wide mb-1">The Problem</p>
                      <p className="text-sm text-almond-700 leading-relaxed">{s.problem}</p>
                    </div>
                    <div className="mb-6 p-4 rounded-xl bg-pink-50 border border-pink-100">
                      <p className="text-xs font-semibold text-pink-500 uppercase tracking-wide mb-1">The Outcome</p>
                      <p className="text-sm text-almond-700 leading-relaxed">{s.outcome}</p>
                    </div>
                    <ul className="space-y-2 mb-8">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-3 text-sm text-almond-700">
                          <span className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-pink-600" />
                          </span>
                          {d}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => { track(Events.CONSULTATION_STARTED, { source: `services_${s.category}` }); navigate('contact'); }}
                      className="btn-primary"
                    >
                      Schedule A Free Consultation <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className={`rounded-2xl overflow-hidden shadow-lg ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <img src={s.image} alt={s.category} className="w-full h-72 object-cover" loading="lazy" />
                  </div>
                </div>
              ))}
            </div>

            {/* ROI Calculator CTA */}
            <div className="mt-20 card p-10 sm:p-14 bg-gradient-to-br from-almond-900 to-almond-800 border-0 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 text-sm font-medium mb-6">
                <BarChart2 className="w-4 h-4" />
                Marketing ROI Calculator
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
                What would better marketing be worth to your business?
              </h2>
              <p className="text-tan-200 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                Enter your current numbers and see the revenue opportunity sitting in your
                existing marketing. Takes less than 2 minutes.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => { track(Events.CALCULATOR_STARTED, { source: 'services' }); navigate('calculator'); }}
                  className="btn-primary"
                >
                  Calculate My Revenue Opportunity <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('contact')}
                  className="btn border-2 border-tan-300 text-tan-100 hover:bg-tan-700/30"
                >
                  Schedule A Free Consultation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── VIRTUAL ASSISTANT ── */}
        {activeTab === 'Virtual Assistant' && (
          <div>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h1 className="font-serif text-4xl sm:text-5xl text-almond-900 mb-4">
                Virtual Assistant Services
              </h1>
              <p className="text-almond-600 text-lg leading-relaxed">
                We handle the tasks that keep your business running so you can focus on
                the work that grows it.
              </p>
            </div>

            {/* What we handle */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
              {vaServices.map(({ icon: Icon, label }) => (
                <div key={label} className="card p-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-pink-600" />
                  </div>
                  <span className="text-sm font-medium text-almond-800">{label}</span>
                </div>
              ))}
            </div>

            {/* Packages */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <h2 className="section-title">Packages & Pricing</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                {vaPackages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`card p-8 flex flex-col ${pkg.highlight ? 'border-pink-300 shadow-lg ring-2 ring-pink-200' : ''}`}
                  >
                    {pkg.highlight && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-4 self-start">
                        <Star className="w-3 h-3" /> Most Popular
                      </div>
                    )}
                    <h3 className="font-serif text-2xl text-almond-900 mb-1">{pkg.name}</h3>
                    <div className="text-pink-600 font-semibold text-lg mb-3">{pkg.price}</div>
                    <p className="text-sm text-almond-500 leading-relaxed mb-2">{pkg.desc}</p>
                    <p className="text-xs text-almond-400 leading-relaxed mb-6">{pkg.hours}</p>
                    <ul className="space-y-2 mb-8 flex-grow">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-almond-700">
                          <Check className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => navigate('contact')}
                      className={pkg.highlight ? 'btn-primary w-full' : 'btn-outline w-full'}
                    >
                      Get Started
                    </button>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="grid sm:grid-cols-3 gap-4 mt-10">
                {[
                  { title: 'No Long-term Contracts', desc: 'Plans are month to month. Cancel or change anytime.' },
                  { title: 'Unused Hours Roll Over', desc: 'Up to 25% of unused hours carry into the next month.' },
                  { title: 'Secure & Confidential', desc: 'NDAs available. Your data stays private and protected.' },
                ].map((b) => (
                  <div key={b.title} className="flex items-start gap-3 p-5 rounded-2xl bg-pink-50 border border-pink-100">
                    <Check className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-almond-900 mb-1">{b.title}</div>
                      <div className="text-xs text-almond-500 leading-relaxed">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Business Assistant */}
            <div className="card p-10 sm:p-14 bg-gradient-to-br from-almond-900 to-almond-800 border-0">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 text-sm font-medium mb-6">
                    <Bot className="w-4 h-4" />
                    AI-Powered Support
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
                    Meet Your AI Business Assistant
                  </h2>
                  <p className="text-tan-200 text-lg leading-relaxed mb-6">
                    We combine the warmth of a dedicated human VA with the speed and
                    precision of AI-powered tools — giving your business a competitive
                    edge without the overhead.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'AI-assisted email drafting & responses',
                      'Smart scheduling & calendar optimization',
                      'Automated research & data summaries',
                      'Content drafts ready for your review',
                      'Workflow automation setup & management',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-tan-200 text-sm">
                        <Zap className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => navigate('contact')} className="btn-primary">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center">
                    <Bot className="w-24 h-24 text-pink-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── EVENT & PROJECT MANAGEMENT ── */}
        {activeTab === 'Event & Project Management' && (
          <div>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h1 className="font-serif text-4xl sm:text-5xl text-almond-900 mb-4">
                Event &amp; Project Management
              </h1>
              <p className="text-almond-600 text-lg leading-relaxed">
                Flexible engagements built around your project or event — no long-term commitment required.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">

              {/* Project Based */}
              <div className="card p-8 flex flex-col">
                <span className="text-xs font-semibold text-pink-500 uppercase tracking-widest mb-3">Project Based</span>
                <h3 className="font-serif text-xl text-almond-900 mb-1">One-off Projects</h3>
                <p className="text-xs text-almond-400 mb-2">One-off projects with flexible scope.</p>
                <div className="text-pink-600 font-bold text-2xl mb-1">$750 <span className="text-sm font-normal text-almond-500">one-time fee</span></div>
                <p className="text-sm text-almond-500 leading-relaxed mb-6">A flexible engagement for specific projects without a monthly commitment.</p>
                <ul className="space-y-2 mb-8 flex-grow">
                  {[
                    'Up to 20 hours of project hours',
                    'Custom scope of work',
                    'Defined deliverables',
                    'Fixed timeline',
                    'One-time engagement',
                    '30 day support window',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-almond-700">
                      <Check className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate('contact')} className="btn-outline w-full">Get Started</button>
              </div>

              {/* Day of Coordination */}
              <div className="card p-8 flex flex-col border-pink-300 shadow-lg ring-2 ring-pink-200">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-4 self-start">
                  <Star className="w-3 h-3" /> Most Popular
                </div>
                <span className="text-xs font-semibold text-pink-500 uppercase tracking-widest mb-3">Event Package</span>
                <h3 className="font-serif text-xl text-almond-900 mb-1">Day of Coordination</h3>
                <p className="text-xs text-almond-400 mb-2">Event Planner steps in 14 days from the event date.</p>
                <div className="text-pink-600 font-bold text-2xl mb-1">$1,000 <span className="text-sm font-normal text-almond-500">booking fee</span></div>
                <p className="text-sm text-almond-500 leading-relaxed mb-6">Focused coordination support in the final stretch before your event.</p>
                <ul className="space-y-2 mb-8 flex-grow">
                  {[
                    'Agreed upon working hours',
                    'Defined scope of responsibilities',
                    'Logistics & Vendor Point of Contact',
                    '16 day support window (14 pre-event, 2 post-event)',
                    'One-time engagement',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-almond-700">
                      <Check className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate('contact')} className="btn-primary w-full">Get Started</button>
              </div>

              {/* Full Scope Event Planner */}
              <div className="card p-8 flex flex-col">
                <span className="text-xs font-semibold text-pink-500 uppercase tracking-widest mb-3">Full Scope</span>
                <h3 className="font-serif text-xl text-almond-900 mb-1">Full Scope Event Planner</h3>
                <p className="text-xs text-almond-400 mb-2">One-off projects with flexible scope.</p>
                <div className="text-pink-600 font-bold text-2xl mb-1">Price Varies <span className="text-sm font-normal text-almond-500">+ booking fee</span></div>
                <p className="text-sm text-almond-500 leading-relaxed mb-6">A contractual engagement for specific projects/events.</p>
                <ul className="space-y-2 mb-8 flex-grow">
                  {[
                    'Project hours vary',
                    'Custom scope of work',
                    'Defined deliverables',
                    'Fixed timeline & budget',
                    'Weekly status update meetings',
                    'Booking fee required & non-refundable',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-almond-700">
                      <Check className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate('contact')} className="btn-outline w-full">Get Started</button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
