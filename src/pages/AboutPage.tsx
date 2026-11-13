import { ArrowRight, CalendarDays } from 'lucide-react';
import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CallToAction } from '@/components/shared/CallToAction';
import { PanelArcs } from '@/components/shared/Decor';
import { ABOUT_HEADING, ABOUT_INTRO, FOUNDER, PILLARS } from '@/content/company';

const methodology = [
  { step: '01', title: 'Assess', desc: 'We start by understanding your business, your market, your current marketing, and your growth objectives. No assumptions.' },
  { step: '02', title: 'Strategize', desc: 'We identify your highest-value growth opportunities and build a prioritized strategy around them — with clear milestones.' },
  { step: '03', title: 'Execute', desc: 'We implement the strategy with precision, coordinating across channels and functions to ensure everything works together.' },
  { step: '04', title: 'Optimize', desc: "We track performance against objectives, identify what's working, and continuously improve. Marketing is never \"set and forget.\"" },
];

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Be Virtually Assured"
        title={ABOUT_HEADING}
        description={<p>{ABOUT_INTRO}</p>}
        image={{
          src: '/about-hero.png',
          alt: `${FOUNDER.name} — Founder, Be Virtually Assured`,
          className: 'object-top',
        }}
        imageOverlay={
          <div className="absolute -bottom-5 left-5 rounded-2xl bg-white p-4 pr-6 shadow-lift sm:left-auto sm:-right-5">
            <div className="text-sm font-semibold text-navy">{FOUNDER.name}</div>
            <div className="text-xs font-medium text-coral-700">{FOUNDER.title}</div>
          </div>
        }
      />

      {/* Why we exist — editorial two-column */}
      <section className="section bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-4 text-teal-700">Our Purpose</p>
            <h2 className="section-title">Why We <span className="text-highlight">Exist</span></h2>
            <div aria-hidden="true" className="mt-6 h-1 w-16 rounded-full bg-coral-500" />
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-ink-700">
            <p className="font-serif text-2xl leading-snug text-navy sm:text-[1.65rem]">
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
      </section>

      {/* Pillars */}
      <section className="section bg-cream-100">
        <div className="container-page">
          <SectionHeading
            eyebrow="What Guides Us"
            title={<>Our 5 Foundational <span className="text-highlight">Pillars</span></>}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {PILLARS.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className={`card p-7 sm:p-8 lg:col-span-2 ${i === 3 ? 'lg:col-start-2' : ''}`}
              >
                <span className="icon-chip mb-5 h-14 w-14">
                  <Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="font-serif text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-relaxed text-ink-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology — deep teal band */}
      <section className="section relative overflow-hidden bg-teal-700 text-white">
        <PanelArcs />
        <div className="container-page relative">
          <SectionHeading
            tone="dark"
            eyebrow="Our Process"
            title="How We Work"
            description="A disciplined four-step process that produces consistent, measurable results."
          />
          <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
            <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-teal-400/50 md:block" />
            {methodology.map((m) => (
              <li key={m.step} className="relative text-center">
                <div className="relative z-10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-teal-300/40 bg-teal-800">
                  <span className="font-serif text-xl font-semibold text-coral-300">{m.step}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold !text-white">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-teal-50/85">{m.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CallToAction
        title={<>Schedule A <span className="text-highlight">Free Consultation</span></>}
        description="Tell us about your business and your growth objectives. We'll review your situation and come prepared with specific observations and recommendations."
        actions={
          <>
            <button
              onClick={() => { track(Events.CONSULTATION_STARTED, { source: 'about_page' }); navigate('contact'); }}
              className="btn-primary"
            >
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Schedule A Free Consultation
            </button>
            <button onClick={() => navigate('services')} className="btn-outline">
              Explore All Services <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </>
        }
      />
    </>
  );
}
