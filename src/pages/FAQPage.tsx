import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';
import { PageHero } from '@/components/shared/PageHero';
import { CallToAction } from '@/components/shared/CallToAction';

const faqs = [
  { q: 'What makes Be Virtually Assured different from a traditional agency?', a: "We operate as a strategic partner, not a vendor. We focus on business outcomes — qualified leads, customer acquisition, and measurable growth — not just marketing activity. Every recommendation is tied to a business objective." },
  { q: 'How quickly can we expect to see results?', a: 'Strategy and positioning improvements can be implemented within weeks. Lead generation and SEO results typically build over 60–90 days. We set clear milestones and track progress against them from day one.' },
  { q: 'Do you work with businesses in specific industries?', a: "We work across professional services, home services, e-commerce, real estate, and B2B. Our approach is adaptable — what matters most is that you're serious about growth and willing to invest in a real strategy." },
  { q: 'What does the engagement process look like?', a: "It starts with a free consultation. From there, we develop a plan, align on priorities, and begin execution. You'll have a dedicated point of contact and regular reporting throughout." },
  { q: 'Do you require long-term contracts?', a: 'Our Virtual Assistant plans are month-to-month with no long-term commitment. Project and event engagements are scoped individually. Marketing strategy engagements are typically 90-day minimum to see meaningful results.' },
  { q: 'How do I get started?', a: 'The easiest way is to schedule a free consultation. We review your current marketing before the call and come prepared with specific observations. No commitment required.' },
];

export function FAQPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={<>Common <span className="text-highlight">Questions</span></>}
        description={<p>Everything you need to know before getting started.</p>}
      />

      <section className="section bg-white pt-12 sm:pt-16">
        <div className="container-page max-w-3xl">
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className={`card overflow-hidden ${open ? 'border-teal-200 bg-teal-50/40' : ''}`}>
                  <h2 className="!font-sans">
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                      aria-expanded={open}
                      aria-controls={`faq-${i}`}
                      id={`faq-q-${i}`}
                    >
                      <span className="font-serif text-lg font-semibold text-navy">{faq.q}</span>
                      <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition ${open ? 'bg-coral-600 text-white' : 'bg-cream-100 text-teal-700'}`}>
                        <ChevronDown className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </span>
                    </button>
                  </h2>
                  {open && (
                    <div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="px-5 pb-6 leading-relaxed text-ink-600 sm:px-6">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CallToAction
        title="Still have questions?"
        description="Schedule a free consultation and we'll answer everything specific to your business."
        actions={
          <>
            <button
              onClick={() => { track(Events.CONSULTATION_STARTED, { source: 'faq_page' }); navigate('contact'); }}
              className="btn-primary"
            >
              Schedule A Free Consultation <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              onClick={() => { track(Events.ASSESSMENT_STARTED, { source: 'faq_page' }); navigate('assessment'); }}
              className="btn-outline"
            >
              Take the Free Assessment
            </button>
          </>
        }
      />
    </>
  );
}
