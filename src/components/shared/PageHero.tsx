import { HIGH_PRIORITY } from '@/lib/format';
import type { ReactNode } from 'react';
import { WaveCorner } from '@/components/shared/Decor';

interface PageHeroProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Buttons rendered under the description. */
  actions?: ReactNode;
  /** Extra content under the description/actions (notices, tabs…). */
  children?: ReactNode;
  /** Optional right-hand image for a split hero. */
  image?: { src: string; alt: string; className?: string };
  /** Overlay rendered on top of the image (caption cards). */
  imageOverlay?: ReactNode;
  align?: 'center' | 'left';
  /** Shrinks vertical padding for utility pages (legal, auth, tools). */
  compact?: boolean;
}

/**
 * Interior-page hero: warm cream gradient, serif headline, soft sage wave in
 * the corner — a lighter echo of the homepage hero.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  children,
  image,
  imageOverlay,
  align,
  compact = false,
}: PageHeroProps) {
  const split = Boolean(image);
  const centered = (align ?? (split ? 'left' : 'center')) === 'center';

  const text = (
    <div className={`relative ${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-xl'}`}>
      {eyebrow && <p className="eyebrow mb-5 text-teal-700">{eyebrow}</p>}
      <h1 className="font-serif font-semibold text-[2.25rem] leading-[1.1] sm:text-5xl lg:text-[3.25rem] text-navy">
        {title}
      </h1>
      {description && (
        <div className="mt-5 text-base sm:text-lg leading-relaxed text-ink-600">{description}</div>
      )}
      {actions && (
        <div className={`mt-8 flex flex-wrap gap-3 ${centered ? 'justify-center' : ''}`}>{actions}</div>
      )}
      {children && <div className="mt-8">{children}</div>}
    </div>
  );

  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-b from-cream-100 via-cream-50 to-cream-50 ${
        compact ? 'pt-12 pb-10 sm:pt-16 sm:pb-12' : 'pt-14 pb-16 sm:pt-20 sm:pb-20'
      }`}
    >
      <WaveCorner tone="teal" corner="bottom-left" className="opacity-80" />
      <div className="container-page relative">
        {split && image ? (
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {text}
            <div className="relative">
              <div className="overflow-hidden rounded-[28px] shadow-lift">
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`h-[320px] w-full object-cover sm:h-[420px] ${image.className ?? ''}`}
                  {...HIGH_PRIORITY}
                />
              </div>
              {imageOverlay}
            </div>
          </div>
        ) : (
          text
        )}
      </div>
    </section>
  );
}
