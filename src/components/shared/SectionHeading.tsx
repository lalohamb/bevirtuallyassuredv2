import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  /** `dark` renders for deep teal/navy backgrounds. */
  tone?: 'default' | 'dark';
  as?: 'h1' | 'h2';
  className?: string;
}

/** Small ruled label + serif headline + optional intro, per the mockup's section intros. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'default',
  as: Tag = 'h2',
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center';
  const dark = tone === 'dark';
  return (
    <div className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <p className={`${centered ? 'eyebrow-ruled' : 'eyebrow'} mb-4 ${dark ? '!text-teal-100' : ''}`}>
          {eyebrow}
        </p>
      )}
      <Tag className={`section-title ${dark ? '!text-white' : ''}`}>{title}</Tag>
      {description && (
        <div className={`section-subtitle ${dark ? '!text-teal-100' : ''}`}>{description}</div>
      )}
    </div>
  );
}
