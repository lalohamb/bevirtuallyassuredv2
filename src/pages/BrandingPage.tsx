import { ArrowRight, Check } from 'lucide-react';
import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';
import { PageHero } from '@/components/shared/PageHero';
import { CallToAction } from '@/components/shared/CallToAction';

const deliverables = [
  'Brand positioning and differentiation',
  'Messaging architecture',
  'Customer value proposition',
  'Brand voice and tone guidelines',
  'Competitive differentiation strategy',
  'Brand architecture (if applicable)',
];

export function BrandingPage() {
  return (
    <>
      <PageHero
        eyebrow="Brand Strategy"
        title={<>Position Your Brand to Win the <span className="text-highlight">Right Clients</span></>}
        description={
          <p>
            If your brand looks and sounds like everyone else in your market, you're competing on price. Strong positioning lets you compete on value.
          </p>
        }
      />

      <section className="section bg-white">
        <div className="container-page">
          {/* Problem / Outcome */}
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-[18px] border border-cream-200 bg-cream-100 p-7">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">The Problem</p>
              <p className="leading-relaxed text-ink-700">
                If your brand looks and sounds like everyone else in your market, you're competing on price. Strong positioning lets you compete on value.
              </p>
            </div>
            <div className="rounded-[18px] border border-teal-100 bg-teal-50 p-7">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">The Outcome</p>
              <p className="leading-relaxed text-ink-700">
                A clear brand position, differentiated messaging, and a customer value proposition that resonates with your ideal clients and justifies premium pricing.
              </p>
            </div>
          </div>

          {/* Image + Deliverables */}
          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-3 rotate-1 rounded-[32px] bg-teal-50" />
              <img
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
                alt="Brand Strategy"
                className="relative h-80 w-full rounded-[28px] object-cover shadow-lift"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="section-title">What's Included</h2>
              <ul className="mt-6 space-y-3">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-ink-700">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal-50">
                      <Check className="h-3 w-3 text-teal-600" aria-hidden="true" />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => { track(Events.CONSULTATION_STARTED, { source: 'branding_page' }); navigate('contact'); }}
                className="btn-primary mt-8"
              >
                Schedule A Free Consultation <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <CallToAction
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
            <button onClick={() => navigate('services')} className="btn-outline-light">
              View All Services
            </button>
          </>
        }
      />
    </>
  );
}
