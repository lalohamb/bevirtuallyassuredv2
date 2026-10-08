import { useState } from 'react';
import { CheckCircle2, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';
import { LeadForm } from '@/components/LeadForm';

const faqs = [
  { q: 'What makes Be Virtually Assured different from a traditional agency?', a: "We operate as a strategic partner, not a vendor. We focus on business outcomes — qualified leads, customer acquisition, and measurable growth — not just marketing activity. Every recommendation is tied to a business objective." },
  { q: 'How quickly can we expect to see results?', a: 'Strategy and positioning improvements can be implemented within weeks. Lead generation and SEO results typically build over 60–90 days. We set clear milestones and track progress against them from day one.' },
  { q: 'Do you work with businesses in specific industries?', a: "We work across professional services, home services, e-commerce, real estate, and B2B. Our approach is adaptable — what matters most is that you're serious about growth and willing to invest in a real strategy." },
  { q: 'What does the engagement process look like?', a: "It starts with a free consultation. From there, we develop a plan, align on priorities, and begin execution. You'll have a dedicated point of contact and regular reporting throughout." },
];

export function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="pt-28 pb-20">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              Free Strategy Consultation
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-almond-900 mb-6">
              Schedule A Free Consultation
            </h1>
            <p className="text-almond-600 text-lg leading-relaxed mb-8">
              Tell us about your business and your growth objectives. We'll review your
              current marketing before the call and come prepared with specific
              observations and recommendations.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                'No commitment — the consultation is completely free',
                'We review your current marketing before the call',
                'You leave with at least one actionable insight',
                'No generic pitch — specific to your business and goals',
                'Typically 45–60 minutes via video call',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-almond-700">
                  <CheckCircle2 className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="p-5 rounded-2xl bg-almond-50 border border-almond-100 mb-6">
              <h3 className="font-serif text-base text-almond-900 mb-2">What happens after you submit?</h3>
              <ol className="space-y-2 text-sm text-almond-600">
                <li className="flex gap-2"><span className="text-pink-500 font-semibold">1.</span> We review your submission within one business day.</li>
                <li className="flex gap-2"><span className="text-pink-500 font-semibold">2.</span> We do a quick review of your website and current marketing.</li>
                <li className="flex gap-2"><span className="text-pink-500 font-semibold">3.</span> We reach out to schedule a 45–60 minute strategy call.</li>
                <li className="flex gap-2"><span className="text-pink-500 font-semibold">4.</span> You leave the call with specific, actionable recommendations.</li>
              </ol>
            </div>

            <div className="p-5 rounded-2xl bg-pink-50 border border-pink-100">
              <p className="text-sm text-almond-700 leading-relaxed">
                <span className="font-semibold text-almond-900">Not ready for a call yet?</span>{' '}
                Take our free marketing assessment first and we'll use your results to make the consultation even more valuable.
              </p>
              <button
                onClick={() => { track(Events.ASSESSMENT_STARTED, { source: 'contact_page' }); navigate('assessment'); }}
                className="btn-outline text-sm mt-3"
              >
                Take the Free Assessment First
              </button>
            </div>
          </div>

          <LeadForm />
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title">Common Questions</h2>
            <p className="section-subtitle">Everything you need to know before getting started.</p>
          </div>
          <div className="space-y-3">
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
        </div>
      </div>
    </div>
  );
}
