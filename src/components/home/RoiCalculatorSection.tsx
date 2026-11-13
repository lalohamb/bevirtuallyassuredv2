import { ArrowRight, BarChart2, Calculator } from 'lucide-react';
import { CardCurve, WaveCorner } from '@/components/shared/Decor';

interface Props {
  onCalculate: () => void;
  onConsultation: () => void;
}

/** Supporting section kept from the original homepage: ROI calculator invitation. */
export function RoiCalculatorSection({ onCalculate, onConsultation }: Props) {
  return (
    <section className="section bg-cream-50">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[28px] border border-cream-200 bg-white shadow-soft">
          <WaveCorner tone="teal" corner="top-right" className="!h-40 !w-72 opacity-70" />
          <CardCurve tone="coral" className="!h-20 !w-56" />
          <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.5fr_1fr] lg:p-16">
            <div>
              <span className="badge gap-2 bg-teal-50 px-4 py-1.5 text-sm text-teal-800">
                <BarChart2 className="h-4 w-4" aria-hidden="true" />
                Marketing ROI Calculator
              </span>
              <h2 className="section-title mt-5">
                What would better marketing be worth to <span className="text-highlight">your business?</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">
                Enter your current numbers and see the revenue opportunity sitting in your
                existing marketing. Takes less than 2 minutes.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button onClick={onCalculate} className="btn-primary">
                  Calculate My Revenue Opportunity
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button onClick={onConsultation} className="btn-outline">
                  Schedule A Free Consultation
                </button>
              </div>
            </div>
            <div aria-hidden="true" className="hidden justify-center lg:flex">
              <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-teal-50">
                <div className="absolute inset-4 rounded-full border-2 border-dashed border-teal-200" />
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-teal-600 text-white shadow-lift">
                  <Calculator className="h-12 w-12" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
