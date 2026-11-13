import { ArrowRight } from 'lucide-react';
import { PanelArcs } from '@/components/shared/Decor';
import { ABOUT_HEADING, ABOUT_INTRO } from '@/content/company';

/** Mockup split About band: workstation image left, deep-teal panel right. */
export function AboutSection({ onLearnMore }: { onLearnMore: () => void }) {
  return (
    <section className="relative overflow-hidden bg-teal-700 text-white">
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-[440px]">
          <img
            src="/Nandi Samone Hambrick-Day.png"
            alt="Be Virtually Assured business card on a desk beside a plant and gold document tray"
            width={652}
            height={438}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-teal-700 lg:bg-gradient-to-r" />
        </div>

        <div className="relative px-5 py-14 sm:px-10 sm:py-16 lg:py-20 lg:pl-12 lg:pr-[max(2rem,calc((100vw-var(--container-width))/2+2rem))]">
          <PanelArcs />
          <div className="relative max-w-2xl">
            <p className="eyebrow mb-5 !text-teal-100 before:block before:h-px before:w-12 before:bg-coral-400 before:content-['']">
              About Be Virtually Assured
            </p>
            <h2 className="section-title !text-white">{ABOUT_HEADING}</h2>
            <p className="mt-5 text-base leading-relaxed text-teal-50/90 sm:text-lg">{ABOUT_INTRO}</p>
            <button onClick={onLearnMore} className="btn-outline-light mt-8">
              Learn More About Us <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
