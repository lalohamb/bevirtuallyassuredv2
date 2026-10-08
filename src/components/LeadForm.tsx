import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { track, Events } from '@/lib/analytics';

const industries = [
  'Retail',
  'Professional Services',
  'Health & Wellness',
  'Real Estate',
  'Food & Beverage',
  'Technology',
  'Event Planning',
  'Beauty & Personal Care',
  'Education',
  'Non-Profit',
  'Other',
];

export function LeadForm() {
  const [form, setForm] = useState({
    name: '',
    business_name: '',
    website: '',
    email: '',
    phone: '',
    industry: '',
    message: '',
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
      company: form.business_name.trim() || null,
      phone: form.phone.trim() || null,
      service_interest: form.industry || null,
      message: [
        form.website ? `Website: ${form.website}` : '',
        form.message.trim(),
      ].filter(Boolean).join('\n') || null,
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
          We'll review your information and reach out within one business day to schedule your free consultation.
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
          <label className="label" htmlFor="lf-name">Full Name *</label>
          <input id="lf-name" className="input" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Jane Smith" required />
        </div>
        <div>
          <label className="label" htmlFor="lf-email">Email *</label>
          <input id="lf-email" type="email" className="input" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="jane@company.com" required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label" htmlFor="lf-business">Business Name *</label>
          <input id="lf-business" className="input" value={form.business_name} onChange={(e) => update('business_name', e.target.value)} placeholder="Acme Co." required />
        </div>
        <div>
          <label className="label" htmlFor="lf-website">Website</label>
          <input id="lf-website" className="input" value={form.website} onChange={(e) => update('website', e.target.value)} placeholder="https://yoursite.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label" htmlFor="lf-phone">Phone *</label>
          <input id="lf-phone" className="input" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="(555) 123-4567" required />
        </div>
        <div>
          <label className="label" htmlFor="lf-industry">Industry *</label>
          <select id="lf-industry" className="input" value={form.industry} onChange={(e) => update('industry', e.target.value)} required>
            <option value="">Select your industry…</option>
            {industries.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="lf-message">Brief Summary *</label>
        <textarea
          id="lf-message"
          className="input min-h-[100px] resize-y"
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Tell us a little about your business and what you're looking for help with."
          required
        />
      </div>

      {status === 'error' && <p className="text-error-600 text-sm">{errorMsg}</p>}

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full">
        {status === 'submitting' ? (
          <><Loader2 className="w-4 h-4 animate-spin" />Sending…</>
        ) : (
          <><Send className="w-4 h-4" />Schedule A Free Consultation</>
        )}
      </button>
      <p className="text-xs text-almond-400 text-center">No commitment. We'll reach out within one business day.</p>
    </form>
  );
}
