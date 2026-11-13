import { CheckCircle2 } from 'lucide-react';
import { WaveCorner } from '@/components/shared/Decor';
import { LeadForm } from '@/components/shared/LeadForm';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CONSULTATION_POINTS } from '@/content/company';

/** Closing CTA (mockup "Ready to…" band) carrying the original consultation copy and the working lead form. */
export function ConsultationSection({ onAssessment }: { onAssessment: () => void }) {
  return (
    <section id="contact" className="section relative overflow-hidden bg-gradient-to-b from-cream-100 to-cream-50">
      <WaveCorner tone="teal" corner="bottom-left" />
      <WaveCorner tone="coral" corner="bottom-right" />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="Let's build your growth system"
          title={<>Schedule A <span className="text-highlight">Free Consultation</span></>}
          description="Tell us about your business and your growth objectives. We'll review your situation and come prepared with specific observations and recommendations."
        />

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div className="space-y-6 lg:sticky lg:top-28">
            <ul className="card space-y-4 p-6 sm:p-8">
              {CONSULTATION_POINTS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="card-peach p-6 sm:p-8">
              <p className="leading-relaxed text-ink-700">
                <span className="font-semibold text-navy">Prefer to start with the assessment?</span>{' '}
                Take our free marketing assessment first and we'll use your results to make the consultation even more valuable.
              </p>
              <button onClick={onAssessment} className="btn-outline mt-5 text-sm">
                Take the Free Assessment First
              </button>
            </div>
          </div>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
