import {
  ArrowRight, TrendingUp, BarChart2, Users, Zap,
  CheckCircle2, Layers, Target,
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
  { icon: Target, title: 'Marketing Strategy', desc: 'Branding, Web Design, Content Creation, SEO, Email Campaigns, and more.' },
  { icon: Users, title: 'Virtual Admin Support', desc: 'Email & Calendar Support, Customer Support, Data Entry & Research, Basic Bookkeeping, Social Media management & more.' },
  { icon: Layers, title: 'Event Coordination', desc: 'Event Planning, Decor Arrangements, Logistics, Vendor Management, Budgeting & Day Of Coordination and more.' },
  { icon: Zap, title: 'Project Management', desc: 'Oversee Workflow & Task Tracking, Task Scheduling and Coordination, Meeting & Status Support, Timeline Deadline Tracking, Client & Vendor Communication and more.' },
];

export function HomePage() {
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
                Premium Small Business Services
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-almond-900 leading-[1.1] mb-6">
                Turn Your Business Into A<br />
                <span className="text-pink-600">Growth Machine.</span>
              </h1>
              <p className="text-lg text-almond-600 leading-relaxed mb-8 max-w-lg">
                We assist with the tasks you find mundane or complex, so that you can focus on more revenue generating activities. Let's get connected so we can get to know your unique business and build systems that produce measurable, repeatable growth.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => handleAssessment('hero')} className="btn-primary">
                  Get Your Free Marketing Assessment
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => handleConsultation('hero')} className="btn-outline">
                  Schedule A Free Consultation
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
            <h2 className="section-title">What We Can Do For You</h2>
            <p className="section-subtitle">
              From marketing strategy, email and calendar management, phone and administrative support, to content creation, project and event support we are trained across the tasks that keep your business running.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                Schedule A Free Consultation
              </button>
            </div>
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
                Schedule A Free Consultation
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
