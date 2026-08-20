import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase, type Lead } from '@/lib/supabase';

const serviceOptions = [
  'Email & Calendar Management',
  'Customer Support',
  'Social Media Management',
  'Bookkeeping & Invoicing',
  'Content Creation',
  'Project Coordination',
  'Not sure yet — help me decide',
];

export function LeadForm() {
  const [form, setForm] = useState<Lead>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service_interest: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (field: keyof Lead, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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
      service_interest: form.service_interest || null,
      message: form.message?.trim() || null,
    });

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email us directly.');
      return;
    }
    setStatus('success');
    setForm({ name: '', email: '', company: '', phone: '', service_interest: '', message: '' });
  };

  if (status === 'success') {
    return (
      <div className="card p-8 text-center animate-scale-in">
        <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-success-600" />
        </div>
        <h3 className="font-serif text-2xl text-almond-900 mb-2">Thank you!</h3>
        <p className="text-almond-500 mb-6">
          We received your request and will reach out within one business day.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-outline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label" htmlFor="lead-name">Name *</label>
          <input
            id="lead-name"
            className="input"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Jane Doe"
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="lead-email">Email *</label>
          <input
            id="lead-email"
            type="email"
            className="input"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="jane@company.com"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label" htmlFor="lead-company">Company</label>
          <input
            id="lead-company"
            className="input"
            value={form.company ?? ''}
            onChange={(e) => update('company', e.target.value)}
            placeholder="Acme Inc."
          />
        </div>
        <div>
          <label className="label" htmlFor="lead-phone">Phone</label>
          <input
            id="lead-phone"
            className="input"
            value={form.phone ?? ''}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="lead-service">What do you need help with?</label>
        <select
          id="lead-service"
          className="input"
          value={form.service_interest ?? ''}
          onChange={(e) => update('service_interest', e.target.value)}
        >
          <option value="">Select a service…</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="label" htmlFor="lead-message">Tell us about your needs</label>
        <textarea
          id="lead-message"
          className="input min-h-[120px] resize-y"
          value={form.message ?? ''}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Describe your business and what tasks you'd like to delegate…"
        />
      </div>

      {status === 'error' && (
        <p className="text-error-600 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Request a Consultation
          </>
        )}
      </button>
    </form>
  );
}
