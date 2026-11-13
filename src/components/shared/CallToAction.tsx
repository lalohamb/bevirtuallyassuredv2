import type { ReactNode } from 'react';
import { PanelArcs, WaveCorner } from '@/components/shared/Decor';

interface CallToActionProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions: ReactNode;
  /**
   * `cream`  — mockup closing CTA: warm off-white, navy heading, teal/coral waves.
   * `deep`   — full-bleed deep-teal panel (mockup About band treatment).
   */
  variant?: 'cream' | 'deep';
  /** Render as a contained rounded card instead of a full-width band. */
  contained?: boolean;
  className?: string;
}

export function CallToAction({
  eyebrow,
  title,
  description,
  actions,
  variant = 'cream',
  contained = false,
  className = '',
}: CallToActionProps) {
  const deep = variant === 'deep';

  const inner = (
    <div className="relative mx-auto max-w-2xl text-center">
      {eyebrow && (
        <div className={`eyebrow mb-5 ${deep ? '!text-teal-100' : 'text-teal-700'}`}>{eyebrow}</div>
      )}
      <h2 className={`section-title ${deep ? '!text-white' : ''}`}>{title}</h2>
      {description && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${deep ? 'text-teal-50/90' : 'text-ink-600'}`}>
          {description}
        </p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>
    </div>
  );

  const surface = deep
    ? 'bg-gradient-to-br from-teal-700 to-teal-800 text-white'
    : 'bg-gradient-to-b from-cream-100 to-cream-50';

  if (contained) {
    return (
      <div
        className={`relative overflow-hidden rounded-[28px] px-6 py-14 sm:px-12 sm:py-16 ${surface} ${
          deep ? '' : 'border border-cream-200'
        } ${className}`}
      >
        {deep ? (
          <PanelArcs />
        ) : (
          <>
            <WaveCorner tone="teal" corner="bottom-left" className="!h-32 !w-64" />
            <WaveCorner tone="coral" corner="bottom-right" className="!h-28 !w-56" />
          </>
        )}
        {inner}
      </div>
    );
  }

  return (
    <section className={`section relative overflow-hidden ${surface} ${className}`}>
      {deep ? (
        <PanelArcs />
      ) : (
        <>
          <WaveCorner tone="teal" corner="bottom-left" />
          <WaveCorner tone="coral" corner="bottom-right" />
        </>
      )}
      <div className="container-page relative">{inner}</div>
    </section>
  );
}
