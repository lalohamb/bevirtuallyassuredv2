import { PILLARS } from '@/content/company';

/** Light-teal benefits strip under the hero — the five foundational pillars. */
export function ValueStrip() {
  return (
    <section aria-label="Our foundational pillars" className="border-y border-teal-100 bg-teal-50">
      <div className="container-page">
        <ul className="grid gap-x-8 gap-y-8 py-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-0 lg:divide-x lg:divide-teal-200 lg:py-9">
          {PILLARS.map(({ icon: Icon, title, desc }) => (
            <li key={title} className="flex gap-4 lg:flex-col lg:gap-3 lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <Icon className="h-9 w-9 flex-shrink-0 text-teal-600" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3 className="font-sans text-base font-semibold text-navy">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
