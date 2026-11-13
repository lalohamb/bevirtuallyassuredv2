/**
 * Decorative SVG shapes from the approved mockup: soft overlapping waves in
 * sage/teal and coral, the card-corner curve, and the hand-drawn underline.
 * All are aria-hidden and pointer-events-none; place inside a `relative
 * overflow-hidden` parent.
 */

type Tone = 'teal' | 'coral' | 'light';

const waveFill: Record<Tone, [string, string]> = {
  teal: ['fill-teal-200/60', 'fill-teal-300/40'],
  coral: ['fill-coral-200/50', 'fill-coral-100/70'],
  light: ['fill-white/10', 'fill-white/[0.06]'],
};

/** Two overlapping sweeping waves anchored to a corner. */
export function WaveCorner({
  tone = 'teal',
  corner = 'bottom-left',
  className = '',
}: {
  tone?: Tone;
  corner?: 'bottom-left' | 'bottom-right' | 'top-right';
  className?: string;
}) {
  const [a, b] = waveFill[tone];
  const pos = {
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0 -scale-x-100',
    'top-right': 'top-0 right-0 -scale-x-100 -scale-y-100',
  }[corner];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 480 240"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute ${pos} h-40 w-72 sm:h-56 sm:w-[28rem] ${className}`}
    >
      <path className={a} d="M0 240V96C80 60 170 70 250 128C320 178 400 214 480 240Z" />
      <path className={b} d="M0 240V160C110 120 210 150 300 196C350 220 400 236 440 240Z" />
    </svg>
  );
}

/** Small sweeping curve for the bottom-right corner of a card. */
export function CardCurve({ tone = 'teal', className = '' }: { tone?: Tone; className?: string }) {
  const [a, b] = waveFill[tone];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 80"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute bottom-0 right-0 h-14 w-40 ${className}`}
    >
      <path className={a} d="M200 80H20C70 70 120 46 200 8Z" />
      <path className={b} d="M200 80H90C130 74 165 60 200 36Z" />
    </svg>
  );
}

/** Large arcs for deep teal panels (mockup About band, right edge). */
export function PanelArcs({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 300"
      className={`pointer-events-none absolute -right-16 -bottom-24 h-80 w-80 ${className}`}
    >
      <path className="fill-white/[0.07]" d="M300 0C180 40 100 140 80 300H300Z" />
      <path className="fill-teal-300/20" d="M300 90C220 120 170 200 160 300H300Z" />
    </svg>
  );
}

/** Hand-drawn coral underline, sized to its parent's width. */
export function Swoosh({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 16"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute left-0 -bottom-2 h-3 w-full text-coral-500 ${className}`}
    >
      <path
        d="M4 11C70 4 160 2 296 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
