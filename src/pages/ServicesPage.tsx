import { ArrowRight, Check, Target, Search, Megaphone, Layers, Zap, Users } from 'lucide-react';
import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';

const services = [
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
    outcome: 'A lead generation system that consistently delivers qualified prospects into your pipeline, with clear attribution so you know exactly what\'s working.',
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
  {
    icon: Users,
    category: 'Fractional CMO',
    headline: 'Senior Marketing Leadership Without the Full-Time Cost',
    problem: "Growing companies often need strategic marketing leadership but aren't ready — or don't need — a full-time CMO. The gap between junior execution and senior strategy is where growth stalls.",
    outcome: 'Executive-level marketing leadership on a fractional basis — strategic direction, team oversight, and accountability for marketing performance.',
    deliverables: [
      'Marketing strategy and planning',
      'Team leadership and mentorship',
      'Agency and vendor management',
      'Board and executive reporting',
      'Marketing budget management',
      'Hiring and team building support',
    ],
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
  },
];

export function ServicesPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-page">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl text-almond-900 mb-4">
            Marketing Services Built Around Business Outcomes
          </h1>
          <p className="text-almond-600 text-lg leading-relaxed">
            Every service we offer is designed to move qualified prospects closer to
            becoming customers — and to give you clear visibility into what's working.
          </p>
        </div>

        <div className="space-y-20">
          {services.map((s, i) => (
            <div
              key={s.category}
              className={`grid lg:grid-cols-2 gap-12 items-center animate-fade-up`}
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
                  onClick={() => { track(Events.CONSULTATION_STARTED, { source: `services_${s.category}` }); navigate('assessment'); }}
                  className="btn-primary"
                >
                  Get a Free Assessment <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className={`rounded-2xl overflow-hidden shadow-lg ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <img
                  src={s.image}
                  alt={s.category}
                  className="w-full h-72 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 card p-10 text-center bg-gradient-to-br from-pink-50 to-tan-100 border-pink-100">
          <h2 className="font-serif text-2xl text-almond-900 mb-3">Not sure where to start?</h2>
          <p className="text-almond-600 mb-6">
            Take our free marketing assessment and we'll identify your highest-value growth opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => { track(Events.ASSESSMENT_STARTED, { source: 'services_cta' }); navigate('assessment'); }}
              className="btn-primary"
            >
              Get Your Free Marketing Assessment <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => navigate('contact')} className="btn-outline">
              Book a Consultation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
