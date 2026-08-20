import { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, ArrowRight, User, Building2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase, type ClientProfile } from '@/lib/supabase';
import { navigate } from '@/lib/router';

const businessTypes = [
  'E-commerce',
  'Consulting / Coaching',
  'Creative / Agency',
  'Real Estate',
  'Legal',
  'Health & Wellness',
  'Other',
];

const steps = ['Business details', 'Needs & preferences', 'Review'];

export function OnboardingPage() {
  const { user, loading: authLoading } = useAuth();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [existing, setExisting] = useState<ClientProfile | null>(null);
  const [form, setForm] = useState({
    business_name: '',
    contact_name: '',
    email: '',
    phone: '',
    business_type: '',
    monthly_hours: 10,
    preferred_tools: '',
    notes: '',
  });

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('login');
      return;
    }
    setForm((f) => ({ ...f, email: user.email ?? '' }));
    supabase
      .from('client_profiles')
      .select('*')
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setExisting(data);
          setForm({
            business_name: data.business_name ?? '',
            contact_name: data.contact_name ?? '',
            email: data.email ?? user.email ?? '',
            phone: data.phone ?? '',
            business_type: data.business_type ?? '',
            monthly_hours: data.monthly_hours ?? 10,
            preferred_tools: data.preferred_tools ?? '',
            notes: data.notes ?? '',
          });
        }
      });
  }, [user, authLoading]);

  const update = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (step === 0) return form.business_name.trim() && form.contact_name.trim();
    if (step === 1) return form.business_type;
    return true;
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const payload = {
      business_name: form.business_name.trim(),
      contact_name: form.contact_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      business_type: form.business_type,
      monthly_hours: Number(form.monthly_hours) || null,
      preferred_tools: form.preferred_tools.trim() || null,
      notes: form.notes.trim() || null,
      onboarding_completed: true,
    };

    if (existing) {
      await supabase.from('client_profiles').update({
        ...payload,
        updated_at: new Date().toISOString(),
      }).eq('id', existing.id);
    } else {
      await supabase.from('client_profiles').insert(payload);
    }

    setSaving(false);
    setDone(true);
    setTimeout(() => navigate('dashboard'), 1800);
  };

  if (done) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center">
        <div className="container-page max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <CheckCircle2 className="w-10 h-10 text-success-600" />
          </div>
          <h1 className="font-serif text-3xl text-almond-900 mb-3">You're all set!</h1>
          <p className="text-almond-500 mb-2">Your onboarding is complete.</p>
          <p className="text-almond-400 text-sm">Taking you to your dashboard…</p>
          <Loader2 className="w-5 h-5 animate-spin text-pink-500 mx-auto mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="container-page max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-almond-900 mb-2">Client Onboarding</h1>
          <p className="text-almond-500">Tell us about your business so we can match you with the right assistant.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className={`flex items-center gap-2 ${i <= step ? 'text-pink-600' : 'text-almond-300'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  i < step ? 'bg-pink-500 text-white' : i === step ? 'bg-pink-100 text-pink-700 ring-2 ring-pink-400' : 'bg-tan-100'
                }`}>
                  {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className="text-sm font-medium hidden sm:inline">{label}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-8 sm:w-16 h-0.5 mx-1 ${i < step ? 'bg-pink-300' : 'bg-tan-200'}`} />}
            </div>
          ))}
        </div>

        <div className="card p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-pink-500" />
                <h2 className="font-serif text-xl text-almond-900">Business details</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Business name *</label>
                  <input className="input" value={form.business_name} onChange={(e) => update('business_name', e.target.value)} placeholder="Acme Inc." />
                </div>
                <div>
                  <label className="label">Contact name *</label>
                  <input className="input" value={form.contact_name} onChange={(e) => update('contact_name', e.target.value)} placeholder="Jane Doe" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Email</label>
                  <input className="input" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="jane@acme.com" />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input className="input" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="(555) 123-4567" />
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-pink-500" />
                <h2 className="font-serif text-xl text-almond-900">Needs & preferences</h2>
              </div>
              <div>
                <label className="label">Business type *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {businessTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => update('business_type', t)}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition ${
                        form.business_type === t
                          ? 'bg-pink-500 text-white border-pink-500'
                          : 'bg-white text-almond-600 border-almond-200 hover:border-pink-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label">Estimated monthly hours needed</label>
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={5}
                  value={form.monthly_hours}
                  onChange={(e) => update('monthly_hours', Number(e.target.value))}
                  className="w-full accent-pink-500"
                />
                <div className="flex justify-between text-xs text-almond-400 mt-1">
                  <span>5 hrs</span>
                  <span className="text-pink-600 font-semibold">{form.monthly_hours} hrs/month</span>
                  <span>50 hrs</span>
                </div>
              </div>
              <div>
                <label className="label">Preferred tools / software</label>
                <input className="input" value={form.preferred_tools} onChange={(e) => update('preferred_tools', e.target.value)} placeholder="Google Workspace, Slack, Notion…" />
              </div>
              <div>
                <label className="label">Anything else we should know?</label>
                <textarea className="input min-h-[100px] resize-y" value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Describe the tasks you'd like to delegate…" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="font-serif text-xl text-almond-900 mb-2">Review your details</h2>
              <dl className="divide-y divide-almond-100">
                {[
                  ['Business name', form.business_name],
                  ['Contact name', form.contact_name],
                  ['Email', form.email],
                  ['Phone', form.phone || '—'],
                  ['Business type', form.business_type],
                  ['Monthly hours', `${form.monthly_hours} hrs`],
                  ['Preferred tools', form.preferred_tools || '—'],
                  ['Notes', form.notes || '—'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-3">
                    <dt className="text-sm text-almond-500">{label}</dt>
                    <dd className="text-sm text-almond-900 font-medium text-right max-w-[60%]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Back
            </button>
            {step < 2 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed()}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSave} disabled={saving} className="btn-primary">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                {saving ? 'Saving…' : 'Complete Onboarding'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
