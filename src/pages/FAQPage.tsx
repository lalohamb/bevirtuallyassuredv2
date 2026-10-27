import { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';

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
    <div className="pt-28 pb-20">
      <div className="container-page max-w-3xl">

        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl text-almond-900 mb-4">Common Questions</h1>
          <p className="text-almond-600 text-lg">Everything you need to know before getting started.</p>
        </div>

        <div className="space-y-3 mb-16">
          {faqs.map((faq, i) => (
            <div key={i} className="card overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={openFaq === i}
              >
                <span className="font-serif text-almond-900 text-base pr-4">{faq.q}</span>
                {openFaq === i
                  ? <ChevronUp className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  : <ChevronDown className="w-5 h-5 text-almond-400 flex-shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-sm text-almond-500 leading-relaxed border-t border-almond-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="card p-10 bg-gradient-to-br from-pink-50 to-tan-50 border-pink-100 text-center">
          <h2 className="font-serif text-2xl text-almond-900 mb-3">Still have questions?</h2>
          <p className="text-almond-600 mb-6">Schedule a free consultation and we'll answer everything specific to your business.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => { track(Events.CONSULTATION_STARTED, { source: 'faq_page' }); navigate('contact'); }}
              className="btn-primary"
            >
              Schedule A Free Consultation <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => { track(Events.ASSESSMENT_STARTED, { source: 'faq_page' }); navigate('assessment'); }}
              className="btn-outline"
            >
              Take the Free Assessment
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
