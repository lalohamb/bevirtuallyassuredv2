import { CheckCircle2, TrendingUp } from 'lucide-react';
import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';
import { LeadForm } from '@/components/LeadForm';

export function ContactPage() {
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
              Book a Strategy Consultation
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
      </div>
    </div>
  );
}
