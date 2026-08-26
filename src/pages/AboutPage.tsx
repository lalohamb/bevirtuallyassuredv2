import { ArrowRight, Target, BarChart2, Users, CheckCircle2 } from 'lucide-react';
import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';

const values = [
  { icon: Target, title: 'Strategy before tactics', desc: 'We never recommend a tactic without first understanding the strategy it serves. Activity without direction is just noise.' },
  { icon: BarChart2, title: 'Outcomes over activity', desc: 'We measure success by business results — qualified leads, customer acquisition, revenue growth — not by impressions or follower counts.' },
  { icon: Users, title: 'Partnership over vendor', desc: "We operate as an extension of your team. Your growth objectives become our growth objectives. We're invested in your success." },
];

const methodology = [
  { step: '01', title: 'Assess', desc: 'We start by understanding your business, your market, your current marketing, and your growth objectives. No assumptions.' },
  { step: '02', title: 'Strategize', desc: 'We identify your highest-value growth opportunities and build a prioritized strategy around them — with clear milestones.' },
  { step: '03', title: 'Execute', desc: 'We implement the strategy with precision, coordinating across channels and functions to ensure everything works together.' },
  { step: '04', title: 'Optimize', desc: 'We track performance against objectives, identify what\'s working, and continuously improve. Marketing is never "set and forget."' },
];

export function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-page">

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-up">
            <h1 className="font-serif text-4xl sm:text-5xl text-almond-900 mb-6">
              We help businesses turn marketing into a<br />
              <span className="text-pink-600">measurable growth engine.</span>
            </h1>
            <p className="text-almond-600 text-lg leading-relaxed mb-6">
              Be Virtually Assured is a marketing consulting firm focused on one thing:
              helping businesses generate qualified leads, improve conversion, and build
              marketing systems that produce repeatable, measurable growth.
            </p>
            <p className="text-almond-600 leading-relaxed mb-8">
              We work with established small businesses, growing SMBs, and professional
              services firms that are serious about growth and ready to invest in a real
              marketing strategy — not just more activity.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => { track(Events.ASSESSMENT_STARTED, { source: 'about' }); navigate('assessment'); }}
                className="btn-primary"
              >
                Get Your Free Assessment <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('contact')} className="btn-outline">
                Book a Consultation
              </button>
            </div>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
                alt="Na'ndi Hambrick — Founder, Be Virtually Assured"
                className="w-full h-[420px] object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-4 max-w-[200px]">
              <div className="text-sm font-semibold text-almond-900">Na'ndi Hambrick</div>
              <div className="text-xs text-pink-600">Founder & Lead Strategist</div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-3 gap-6 mb-20">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-serif text-lg text-almond-900 mb-2">{title}</h3>
              <p className="text-sm text-almond-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Founder story */}
        <div className="mb-20 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title">Why we exist</h2>
          </div>
          <div className="space-y-4 text-almond-600 leading-relaxed">
            <p>
              Most marketing agencies are built around deliverables — content, ads, social posts.
              They measure success by output. We measure success by outcomes.
            </p>
            <p>
              Be Virtually Assured was founded on a simple observation: the businesses that struggle
              most with marketing aren't struggling because they lack tactics. They're struggling
              because they lack a coherent strategy that connects marketing activity to business
              objectives.
            </p>
            <p>
              We built this firm to be the strategic partner that growing businesses need but
              rarely find — one that understands both marketing and business, that speaks in
              terms of revenue and growth rather than impressions and engagement, and that
              holds itself accountable to the same outcomes it promises.
            </p>
          </div>
        </div>

        {/* Methodology */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-title">How we work</h2>
            <p className="section-subtitle">A disciplined four-step process that produces consistent, measurable results.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-almond-200" />
            {methodology.map((m, i) => (
              <div key={m.step} className="text-center animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="font-serif text-xl text-pink-600 font-bold">{m.step}</span>
                </div>
                <h3 className="font-serif text-lg text-almond-900 mb-2">{m.title}</h3>
                <p className="text-sm text-almond-500 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What we don't do */}
        <div className="mb-20 card p-8 sm:p-10 bg-almond-50 border-almond-100">
          <h2 className="font-serif text-2xl text-almond-900 mb-6">What we don't do</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "We don't fabricate results or manufacture social proof",
              "We don't recommend tactics without a strategic rationale",
              "We don't take on clients we can't genuinely help",
              "We don't optimize for vanity metrics",
              "We don't make AI the centerpiece of our pitch",
              "We don't disappear after the strategy deck is delivered",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-almond-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card p-10 text-center bg-gradient-to-br from-pink-50 to-tan-100 border-pink-100">
          <h2 className="font-serif text-2xl text-almond-900 mb-3">Ready to build a marketing system that actually works?</h2>
          <p className="text-almond-600 mb-6">Start with a free marketing assessment — no commitment, no pitch, just clarity.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => { track(Events.ASSESSMENT_STARTED, { source: 'about_cta' }); navigate('assessment'); }}
              className="btn-primary"
            >
              Get Your Free Marketing Assessment
            </button>
            <button onClick={() => navigate('contact')} className="btn-outline">Book a Consultation</button>
          </div>
        </div>

      </div>
    </div>
  );
}
