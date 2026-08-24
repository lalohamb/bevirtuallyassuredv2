import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase, type Lead } from '@/lib/supabase';
import { track, Events } from '@/lib/analytics';

const challengeOptions = [
  'Not generating enough qualified leads',
  'Marketing spend not producing measurable results',
  'Website traffic not converting',
  'No clear customer acquisition strategy',
  'Brand positioning is unclear',
  'Marketing efforts are fragmented',
  'Need senior marketing leadership',
  'Other',
];

export function LeadForm() {
  const [form, setForm] = useState<Lead & { challenge: string; website: string }>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service_interest: '',
    message: '',
    challenge: '',
    website: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setStatus('submitting');
    setErrorMsg('');

    const { error } = await supabase.from('leads').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company?.trim() || null,
      phone: form.phone?.trim() || null,
      service_interest: form.challenge || null,
      message: [form.website ? `Website: ${form.website}` : '', form.message?.trim() || ''].filter(Boolean).join('\n') || null,
    });

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email us directly.');
      return;
    }
    track(Events.CONTACT_SUBMITTED);
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="card p-8 text-center animate-scale-in">
        <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-success-600" />
        </div>
        <h3 className="font-serif text-2xl text-almond-900 mb-2">Request received!</h3>
        <p className="text-almond-500 mb-6">
          We'll review your information and reach out within one business day to schedule your strategy consultation.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-outline">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label" htmlFor="lf-name">Your Name *</label>
          <input id="lf-name" className="input" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Jane Smith" required />
        </div>
        <div>
          <label className="label" htmlFor="lf-email">Work Email *</label>
          <input id="lf-email" type="email" className="input" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="jane@company.com" required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label" htmlFor="lf-company">Company Name</label>
          <input id="lf-company" className="input" value={form.company ?? ''} onChange={(e) => update('company', e.target.value)} placeholder="Acme Inc." />
        </div>
        <div>
          <label className="label" htmlFor="lf-website">Website</label>
          <input id="lf-website" className="input" value={form.website} onChange={(e) => update('website', e.target.value)} placeholder="https://yoursite.com" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="lf-challenge">Biggest Marketing Challenge</label>
        <select id="lf-challenge" className="input" value={form.challenge} onChange={(e) => update('challenge', e.target.value)}>
          <option value="">Select your primary challenge…</option>
          {challengeOptions.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className="label" htmlFor="lf-message">Tell us about your goals</label>
        <textarea
          id="lf-message"
          className="input min-h-[100px] resize-y"
          value={form.message ?? ''}
          onChange={(e) => update('message', e.target.value)}
          placeholder="What does success look like for your business in the next 12 months?"
        />
      </div>

      <div>
        <label className="label" htmlFor="lf-phone">Phone (optional)</label>
        <input id="lf-phone" className="input" value={form.phone ?? ''} onChange={(e) => update('phone', e.target.value)} placeholder="(555) 123-4567" />
      </div>

      {status === 'error' && <p className="text-error-600 text-sm">{errorMsg}</p>}

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full">
        {status === 'submitting' ? (
          <><Loader2 className="w-4 h-4 animate-spin" />Sending…</>
        ) : (
          <><Send className="w-4 h-4" />Book a Strategy Consultation</>
        )}
      </button>
      <p className="text-xs text-almond-400 text-center">No commitment. We'll reach out within one business day.</p>
    </form>
  );
}
