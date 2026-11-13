import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { CardCurve } from '@/components/shared/Decor';

export type CardTone = 'cream' | 'tint' | 'peach';

const toneStyles: Record<CardTone, { card: string; chip: string; curve: 'teal' | 'coral' }> = {
  cream: { card: 'card-cream', chip: 'bg-white text-teal-600', curve: 'teal' },
  tint: { card: 'card-tint', chip: 'bg-white text-teal-600', curve: 'teal' },
  peach: { card: 'card-peach', chip: 'bg-white text-teal-600', curve: 'coral' },
};

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: CardTone;
  linkLabel?: string;
  onClick?: () => void;
}

/** Mockup service card: tinted surface, round teal icon chip, serif title, coral link, corner curve. */
export function ServiceCard({
  icon: Icon,
  title,
  description,
  tone = 'cream',
  linkLabel = 'Learn More',
  onClick,
}: ServiceCardProps) {
  const t = toneStyles[tone];
  return (
    <article
      className={`${t.card} group relative flex h-full flex-col overflow-hidden p-6 sm:p-7 hover:-translate-y-1 hover:shadow-lift`}
    >
      <CardCurve tone={t.curve} />
      <div className="relative flex items-center gap-4">
        <span className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full shadow-sm ${t.chip}`}>
          <Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <h3 className="font-serif text-xl font-semibold leading-snug text-navy">{title}</h3>
      </div>
      <p className="relative mt-4 flex-grow text-[0.95rem] leading-relaxed text-ink-600">{description}</p>
      {onClick && (
        <button
          onClick={onClick}
          className="link-arrow relative mt-5 self-start"
          aria-label={`${linkLabel}: ${title}`}
        >
          {linkLabel} <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </article>
  );
}
