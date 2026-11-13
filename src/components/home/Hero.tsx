import { HIGH_PRIORITY } from '@/lib/format';
import { ArrowRight, BarChart2, CalendarDays } from 'lucide-react';
import { Swoosh, WaveCorner } from '@/components/shared/Decor';

interface HeroProps {
  onConsultation: () => void;
  onServices: () => void;
}

export function Hero({ onConsultation, onServices }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200">
      <WaveCorner tone="coral" corner="bottom-left" className="z-0" />
      <WaveCorner tone="coral" corner="top-right" className="z-0" />

      <div className="container-page relative z-10">
        {/* Text column */}
        <div className="py-14 sm:py-20 lg:flex lg:min-h-[640px] lg:w-[55%] lg:items-center lg:py-24 lg:pr-12">
          <div className="animate-fade-up">
            <p className="eyebrow mb-6 text-navy">
              Premium Small Business Services
            </p>
            <h1 className="font-serif text-[2.1rem] font-semibold leading-[1.08] text-navy sm:text-5xl lg:text-[2.6rem] xl:text-[3rem]">
              Turn Your Business{' '}
              <br />
              Into A{' '}
              
              <span className="relative inline-block whitespace-nowrap italic text-coral-600">
                Growth Machine.
                <Swoosh className="-bottom-1.5 sm:-bottom-2" />
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-700 sm:text-lg">
              We assist with the tasks you find mundane or complex, so that you can focus on more revenue generating activities. Let's get connected so we can get to know your unique business and build systems that produce measurable, repeatable growth.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button onClick={onConsultation} className="btn-primary py-3.5">
                <CalendarDays className="h-5 w-5" aria-hidden="true" />
                Schedule A Free Consultation
              </button>
              <button onClick={onServices} className="btn-outline py-3.5">
                Explore All Services
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero image — right half */}
      <div className="relative z-10 px-5 pb-16 sm:px-6 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:p-0">
        <div className="relative mx-auto h-[420px] max-w-xl sm:h-[520px] lg:mx-0 lg:h-full lg:max-w-none">
          <img
            src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
            alt="Professional Black woman working at a laptop"
            width={900}
            height={1100}
            {...HIGH_PRIORITY}
            className="h-full w-full rounded-[28px] object-cover object-[50%_20%] shadow-lift lg:rounded-none lg:shadow-none"
          />
          <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-cream-100 via-cream-100/60 to-transparent lg:block" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-24 bg-gradient-to-t from-cream-200/70 to-transparent lg:block" />

          {/* Floating card */}
          <div className="absolute -bottom-6 left-4 right-4 flex flex-col gap-3 sm:left-auto sm:right-6 sm:w-64 lg:bottom-[8%] lg:left-4 lg:right-auto lg:w-auto xl:bottom-auto xl:left-8 xl:top-[18%]">
            <div
              className="flex items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-lift backdrop-blur animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-pink-100 text-coral-600">
                <BarChart2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <div className="text-sm font-semibold text-navy">Measurable outcomes</div>
                <div className="text-xs text-ink-500">Strategy tied to business results</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
