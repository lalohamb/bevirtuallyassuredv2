import { useState } from 'react';
import {
  ArrowRight, TrendingUp, Target, BarChart2, Users, Zap, ChevronDown, ChevronUp,
  CheckCircle2, Search, Megaphone, Layers,
} from 'lucide-react';
import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';
import { LeadForm } from '@/components/LeadForm';

const problems = [
  "Marketing spend that doesn't produce measurable results",
  "Website traffic that isn't converting into qualified leads",
  'No clear customer acquisition strategy',
  'Fragmented marketing efforts with no unified direction',
  "Brand positioning that doesn't differentiate you from competitors",
  "Social media activity that doesn't support revenue growth",
];

const services = [
  { icon: Target, title: 'Marketing Strategy', desc: 'Market analysis, positioning, go-to-market planning, and competitive strategy built around your growth objectives.' },
  { icon: Search, title: 'Lead Generation', desc: 'Qualified lead funnels, conversion optimization, and campaign strategy that fills your pipeline with the right prospects.' },
  { icon: Megaphone, title: 'Digital Marketing', desc: 'SEO, paid advertising, email, and content strategy coordinated into a single demand-generation system.' },
  { icon: Layers, title: 'Brand Strategy', desc: 'Positioning, messaging, and differentiation that makes your value proposition impossible to ignore.' },
  { icon: Zap, title: 'Marketing Technology', desc: "CRM optimization, marketing automation, and analytics that give you visibility into what's actually working." },
  { icon: Users, title: 'Fractional CMO', desc: 'Senior marketing leadership for companies that need strategic direction without a full-time executive hire.' },
];

const idealClients = [
  'Established small businesses ready to scale',
  'Professional services firms needing more qualified leads',
  'Growing SMBs without senior marketing leadership',
  'Companies entering new markets or launching new offers',
  "Businesses whose marketing spend isn't producing results",
  'Founders who need a strategic partner, not just an agency',
];

const faqs = [
  { q: 'What makes Nandi Marketing different from a traditional agency?', a: "We operate as a strategic partner, not a vendor. We focus on business outcomes — qualified leads, customer acquisition, and measurable growth — not just marketing activity. Every recommendation is tied to a business objective." },
  { q: 'How quickly can we expect to see results?', a: 'Strategy and positioning improvements can be implemented within weeks. Lead generation and SEO results typically build over 60–90 days. We set clear milestones and track progress against them from day one.' },
  { q: 'Do you work with businesses in specific industries?', a: "We work across professional services, home services, e-commerce, real estate, and B2B. Our approach is adaptable — what matters most is that you're serious about growth and willing to invest in a real strategy." },
  { q: 'What does the engagement process look like?', a: "It starts with a free marketing assessment or strategy consultation. From there, we develop a 90-day growth plan, align on priorities, and begin execution. You'll have a dedicated point of contact and regular reporting throughout." },
  { q: 'What is the Fractional CMO service?', a: "It's senior marketing leadership on a part-time basis. You get strategic direction, team oversight, and executive-level marketing thinking without the cost of a full-time CMO hire. Ideal for companies between $1M–$20M in revenue." },
];

export function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleAssessment = (source: string) => {
    track(Events.ASSESSMENT_STARTED, { source });
    navigate('assessment');
  };

  const handleConsultation = (source: string) => {
    track(Events.CONSULTATION_STARTED, { source });
    navigate('contact');
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-tan-200/50 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                Marketing Consulting & Growth Strategy
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-almond-900 leading-[1.1] mb-6">
                Turn Your Marketing Into a<br />
                <span className="text-pink-600">Growth Engine.</span>
              </h1>
              <p className="text-lg text-almond-600 leading-relaxed mb-8 max-w-lg">
                We help businesses generate qualified leads, improve conversion, and build
                marketing systems that produce measurable, repeatable growth.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => handleAssessment('hero')} className="btn-primary">
                  Get Your Free Marketing Assessment
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => handleConsultation('hero')} className="btn-outline">
                  Book a Strategy Consultation
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
                {[
                  { metric: 'Strategy', label: 'Clarity on your highest-value growth opportunities' },
                  { metric: 'Leads', label: 'A consistent flow of qualified prospects' },
                  { metric: 'Conversion', label: 'More revenue from existing traffic and spend' },
                  { metric: 'Visibility', label: "Know what's working and why" },
                ].map((o) => (
                  <div key={o.metric}>
                    <div className="font-serif text-lg text-pink-600 font-semibold">{o.metric}</div>
                    <div className="text-xs text-almond-500 mt-1 leading-snug">{o.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
                  alt="Marketing strategy session"
                  className="w-full h-[420px] sm:h-[500px] object-cover"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-almond-900/30 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 max-w-[240px]">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <BarChart2 className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-almond-900">Measurable outcomes</div>
                  <div className="text-xs text-almond-500">Strategy tied to business results</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="py-16 sm:py-20 bg-white border-y border-almond-100">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                The root cause is almost always the same: marketing activity without a
                coordinated strategy. More content, more ads, more tools — but no unified
                system connecting them to business outcomes.
              </p>
              <p className="text-almond-600 leading-relaxed mb-8">
                That's what we fix. We connect strategy, brand, demand generation,
                conversion, and analytics into one growth system built around your
                specific business objectives.
              </p>
              <button onClick={() => handleAssessment('problem_section')} className="btn-primary">
                Find Out What's Holding You Back
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-title">How we help you grow</h2>
            <p className="section-subtitle">
              Six integrated service areas, each designed to move qualified prospects
              closer to becoming customers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="card-hover p-6 animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="font-serif text-lg text-almond-900 mb-2">{s.title}</h3>
                <p className="text-sm text-almond-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => { track(Events.SERVICES_VIEWED, { source: 'homepage' }); navigate('services'); }}
              className="btn-outline"
            >
              Explore All Services <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Who we help */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
                alt="Business growth strategy meeting"
                className="w-full h-[400px] object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="section-title mb-4">Who we work with</h2>
              <p className="text-almond-600 leading-relaxed mb-6">
                We work best with businesses that are serious about growth and ready to
                invest in a real marketing strategy — not just more activity.
              </p>
              <ul className="space-y-3 mb-8">
                {idealClients.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-almond-700">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{c}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => handleAssessment('who_we_help')} className="btn-primary">
                See If We're a Good Fit
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator CTA */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="card p-10 sm:p-14 bg-gradient-to-br from-almond-900 to-almond-800 border-0 text-center">
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
                onClick={() => { track(Events.CALCULATOR_STARTED, { source: 'homepage' }); navigate('calculator'); }}
                className="btn-primary"
              >
                Calculate My Revenue Opportunity
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleConsultation('calculator_cta')}
                className="btn border-2 border-tan-300 text-tan-100 hover:bg-tan-700/30"
              >
                Book a Consultation Instead
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-page max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="section-title">Common questions</h2>
            <p className="section-subtitle">Everything you need to know before getting started.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-serif text-almond-900 text-base pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-5 h-5 text-pink-500 flex-shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-almond-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-almond-500 leading-relaxed border-t border-almond-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA / Contact */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                Let's build your growth system
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-almond-900 mb-4">
                Book a Strategy Consultation
              </h2>
              <p className="text-almond-600 text-lg leading-relaxed mb-8">
                Tell us about your business and your growth objectives. We'll review your
                situation and come prepared with specific observations and recommendations.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'No commitment — the consultation is completely free',
                  'We review your current marketing before the call',
                  'You leave with at least one actionable insight',
                  'No generic pitch — specific to your business',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-almond-700">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="p-5 rounded-2xl bg-pink-50 border border-pink-100">
                <p className="text-sm text-almond-700 leading-relaxed">
                  <span className="font-semibold text-almond-900">Prefer to start with the assessment?</span>{' '}
                  Take our free marketing assessment first and we'll use your results to make the consultation even more valuable.
                </p>
                <button onClick={() => handleAssessment('contact_section')} className="btn-outline text-sm mt-3">
                  Take the Free Assessment First
                </button>
              </div>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}
