import { Target, BarChart2, Zap, Lightbulb, Handshake } from 'lucide-react';

const pillars = [
  { icon: Zap, title: 'Proactive Ownership', desc: "We don't just wait for instructions; we anticipate needs, solve problems early, and own the outcomes." },
  { icon: Target, title: 'Agile Adaptability', desc: 'The digital landscape changes fast; we pivot quickly and adapt smoothly to keep our clients ahead of the curve.' },
  { icon: Lightbulb, title: 'Bold Creativity', desc: 'We push boundaries in our marketing strategies to help brands stand out in crowded markets.' },
  { icon: BarChart2, title: 'Efficient Execution', desc: 'We value smart workflows, automation, and speed, eliminating friction for our clients.' },
  { icon: Handshake, title: 'Collaborative Synergy', desc: "We operate as a seamless extension of our clients' internal teams, blending our strengths with theirs." },
];

const methodology = [
  { step: '01', title: 'Assess', desc: 'We start by understanding your business, your market, your current marketing, and your growth objectives. No assumptions.' },
  { step: '02', title: 'Strategize', desc: 'We identify your highest-value growth opportunities and build a prioritized strategy around them — with clear milestones.' },
  { step: '03', title: 'Execute', desc: 'We implement the strategy with precision, coordinating across channels and functions to ensure everything works together.' },
  { step: '04', title: 'Optimize', desc: "We track performance against objectives, identify what's working, and continuously improve. Marketing is never \"set and forget.\"" },
];

export function AboutPage() {
  return (
    <div className="pt-28 pb-24">

      {/* Hero */}
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-28">
          <div className="animate-fade-up">
            <h1 className="font-serif text-4xl sm:text-5xl text-almond-900 mb-6">
              What Sets Us Apart
            </h1>
            <p className="text-almond-600 text-lg leading-relaxed">
              At Virtually Assured, we are committed to helping you succeed by offering a comprehensive range of consulting services tailored to your needs. From marketing strategy and executive administrative support, to event &amp; project management. We take the time to understand your needs and challenges, and create solutions tailored to your business that make a difference.
            </p>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/about-hero.png"
                alt="Na'ndi Hambrick — Founder, Be Virtually Assured"
                className="w-full h-[420px] object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-4 max-w-[200px]">
              <div className="text-sm font-semibold text-almond-900">Na'ndi Hambrick</div>
              <div className="text-xs text-pink-600">Founder &amp; CEO</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why we exist — full-width band */}
      <div className="bg-almond-50 py-20 mb-28">
        <div className="container-page max-w-3xl mx-auto text-center">
          <h2 className="section-title mb-8">Why We Exist</h2>
          <div className="space-y-5 text-almond-600 text-lg leading-relaxed">
            <p>
              Most consulting agencies are built around deliverables — content, ads, social posts.
              They measure success by output. We measure success by outcomes.
            </p>
            <p>
              The businesses that struggle the most aren't struggling because they lack tactics.
              They're struggling because they lack a coherent strategy that connects business
              activity to business objectives.
            </p>
            <p>
              We built this agency to be a strategic partner that grows businesses — one that
              understands both the big picture and the day-to-day, and holds itself accountable
              to the same outcomes it promises.
            </p>
          </div>
        </div>
      </div>

      {/* Pillars */}
      <div className="container-page mb-28">
        <div className="text-center mb-12">
          <h2 className="section-title">Our 5 Foundational Pillars</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-8">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-serif text-lg text-almond-900 mb-3">{title}</h3>
              <p className="text-sm text-almond-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Methodology — full-width band */}
      <div className="bg-almond-50 py-20">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="section-title">How We Work</h2>
            <p className="section-subtitle">A disciplined four-step process that produces consistent, measurable results.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-10 relative">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-almond-200" />
            {methodology.map((m, i) => (
              <div key={m.step} className="text-center animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-5 relative z-10">
                  <span className="font-serif text-xl text-pink-600 font-bold">{m.step}</span>
                </div>
                <h3 className="font-serif text-lg text-almond-900 mb-2">{m.title}</h3>
                <p className="text-sm text-almond-500 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
