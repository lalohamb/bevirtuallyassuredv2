import { CheckCircle2, Mail } from 'lucide-react';
import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';
import { LeadForm } from '@/components/shared/LeadForm';
import { PageHero } from '@/components/shared/PageHero';
import { WaveCorner } from '@/components/shared/Decor';

const points = [
  'No commitment — the consultation is completely free',
  'We review your current marketing before the call',
  'You leave with at least one actionable insight',
  'No generic pitch — specific to your business and goals',
  'Typically 45–60 minutes via video call',
];

const nextSteps = [
  'We review your submission within one business day.',
  'We do a quick review of your website and current marketing.',
  'We reach out to schedule a 45–60 minute strategy call.',
  'You leave the call with specific, actionable recommendations.',
];

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Free Strategy Consultation"
        title={<>Schedule A <span className="text-highlight">Free Consultation</span></>}
        description={
          <p>
            Tell us about your business and your growth objectives. We'll review your
            current marketing before the call and come prepared with specific
            observations and recommendations.
          </p>
        }
      />

      <section className="section relative overflow-hidden bg-cream-50 pt-12 sm:pt-16">
        <WaveCorner tone="coral" corner="bottom-right" />
        <div className="container-page relative grid items-start gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-12">
          <div className="space-y-6 lg:sticky lg:top-28">
            <ul className="card space-y-4 p-6 sm:p-8">
              {points.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="card-tint p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold">What happens after you submit?</h2>
              <ol className="mt-5 space-y-4">
                {nextSteps.map((step, i) => (
                  <li key={step} className="flex gap-4 text-ink-700">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-semibold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 text-[0.95rem] leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="card-peach p-6 sm:p-8">
              <p className="leading-relaxed text-ink-700">
                <span className="font-semibold text-navy">Not ready for a call yet?</span>{' '}
                Take our free marketing assessment first and we'll use your results to make the consultation even more valuable.
              </p>
              <button
                onClick={() => { track(Events.ASSESSMENT_STARTED, { source: 'contact_page' }); navigate('assessment'); }}
                className="btn-outline mt-5 text-sm"
              >
                Take the Free Assessment First
              </button>
            </div>

            <a
              href="mailto:hello@bevirtuallyassured.com"
              className="flex items-center gap-3 px-2 text-sm text-ink-600 transition-colors hover:text-teal-700"
            >
              <Mail className="h-4 w-4 text-coral-600" aria-hidden="true" />
              hello@bevirtuallyassured.com
            </a>
          </div>

          <LeadForm />
        </div>
      </section>
    </>
  );
}
