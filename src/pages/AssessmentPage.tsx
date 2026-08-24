import { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, BarChart2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';

type Step = 'intro' | 'questions' | 'capture' | 'results';

interface Answers {
  industry: string;
  employees: string;
  revenue: string;
  channels: string[];
  budget: string;
  leads: string;
  challenge: string;
  objective: string;
}

interface ContactInfo {
  name: string;
  email: string;
  company: string;
  phone: string;
}

const INDUSTRIES = ['Professional Services', 'Home Services', 'E-Commerce', 'Real Estate', 'Healthcare', 'B2B / SaaS', 'Retail', 'Other'];
const EMPLOYEE_RANGES = ['1–5', '6–20', '21–50', '51–200', '200+'];
const REVENUE_RANGES = ['Under $500K', '$500K–$1M', '$1M–$5M', '$5M–$20M', '$20M+'];
const CHANNELS = ['SEO / Organic Search', 'Paid Advertising', 'Social Media', 'Email Marketing', 'Content / Blog', 'Referrals / Word of Mouth', 'Events / Networking', 'None currently'];
const BUDGET_RANGES = ['Under $1K/mo', '$1K–$3K/mo', '$3K–$10K/mo', '$10K–$30K/mo', '$30K+/mo'];
const LEAD_VOLUMES = ['0–10/mo', '11–30/mo', '31–100/mo', '100+/mo', "I don't track this"];
const CHALLENGES = [
  'Not generating enough qualified leads',
  'Marketing spend not producing measurable results',
  'Website traffic not converting',
  'No clear customer acquisition strategy',
  'Brand positioning is unclear',
  'Marketing efforts are fragmented',
  'No senior marketing leadership',
  'Other',
];
const OBJECTIVES = [
  'Generate more qualified leads',
  'Improve conversion rates',
  'Build brand awareness',
  'Enter a new market',
  'Reduce customer acquisition cost',
  'Build a scalable marketing system',
];

function scoreMarketing(answers: Answers): { total: number; areas: { name: string; score: number; note: string }[] } {
  const areas = [
    {
      name: 'Lead Generation',
      score: answers.leads === '100+/mo' ? 85 : answers.leads === '31–100/mo' ? 65 : answers.leads === '11–30/mo' ? 45 : 25,
      note: answers.leads === '100+/mo' ? 'Strong lead volume — focus on quality and conversion.' : 'Significant opportunity to increase qualified lead flow.',
    },
    {
      name: 'Marketing Channels',
      score: Math.min(90, answers.channels.filter(c => c !== 'None currently').length * 18),
      note: answers.channels.length >= 4 ? 'Good channel diversity — ensure they\'re coordinated.' : 'Expanding your channel mix could significantly increase reach.',
    },
    {
      name: 'Marketing Investment',
      score: answers.budget === '$30K+/mo' ? 90 : answers.budget === '$10K–$30K/mo' ? 75 : answers.budget === '$3K–$10K/mo' ? 55 : answers.budget === '$1K–$3K/mo' ? 35 : 20,
      note: answers.budget === 'Under $1K/mo' ? 'Current investment may limit growth velocity.' : 'Investment level supports meaningful growth initiatives.',
    },
    {
      name: 'Strategy & Direction',
      score: answers.challenge === 'No clear customer acquisition strategy' || answers.challenge === 'Marketing efforts are fragmented' ? 25 : 60,
      note: answers.challenge === 'No clear customer acquisition strategy' ? 'A clear strategy is the highest-leverage starting point.' : 'Some strategic foundation exists — opportunity to sharpen it.',
    },
    {
      name: 'Analytics & Visibility',
      score: answers.leads === "I don't track this" ? 20 : 55,
      note: answers.leads === "I don't track this" ? 'Tracking lead volume is the first step to improving it.' : 'Basic tracking in place — opportunity to deepen attribution.',
    },
  ];

  const total = Math.round(areas.reduce((sum, a) => sum + a.score, 0) / areas.length);
  return { total, areas };
}

export function AssessmentPage() {
  const [step, setStep] = useState<Step>('intro');
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    industry: '', employees: '', revenue: '', channels: [], budget: '', leads: '', challenge: '', objective: '',
  });
  const [contact, setContact] = useState<ContactInfo>({ name: '', email: '', company: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [score, setScore] = useState<ReturnType<typeof scoreMarketing> | null>(null);

  const questions = [
    { key: 'industry', label: 'What industry are you in?', options: INDUSTRIES, multi: false },
    { key: 'employees', label: 'How many employees does your business have?', options: EMPLOYEE_RANGES, multi: false },
    { key: 'revenue', label: 'What is your approximate annual revenue?', options: REVENUE_RANGES, multi: false },
    { key: 'channels', label: 'Which marketing channels are you currently using?', options: CHANNELS, multi: true },
    { key: 'budget', label: 'What is your approximate monthly marketing budget?', options: BUDGET_RANGES, multi: false },
    { key: 'leads', label: 'How many qualified leads do you generate per month?', options: LEAD_VOLUMES, multi: false },
    { key: 'challenge', label: 'What is your biggest marketing challenge right now?', options: CHALLENGES, multi: false },
    { key: 'objective', label: 'What is your primary growth objective for the next 12 months?', options: OBJECTIVES, multi: false },
  ];

  const currentQ = questions[qIndex];
  const currentAnswer = answers[currentQ?.key as keyof Answers];
  const canAdvance = currentQ?.multi
    ? (currentAnswer as string[]).length > 0
    : Boolean(currentAnswer);

  const selectOption = (option: string) => {
    if (currentQ.multi) {
      const arr = answers.channels;
      setAnswers((prev) => ({
        ...prev,
        channels: arr.includes(option) ? arr.filter((c) => c !== option) : [...arr, option],
      }));
    } else {
      setAnswers((prev) => ({ ...prev, [currentQ.key]: option }));
    }
  };

  const nextQuestion = () => {
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setStep('capture');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.name.trim() || !contact.email.trim()) return;
    setSubmitting(true);

    const result = scoreMarketing(answers);
    setScore(result);

    await supabase.from('leads').insert({
      name: contact.name.trim(),
      email: contact.email.trim(),
      company: contact.company.trim() || null,
      phone: contact.phone.trim() || null,
      service_interest: answers.challenge || null,
      message: JSON.stringify({ ...answers, score: result.total, source: 'assessment' }),
    });

    track(Events.ASSESSMENT_COMPLETED, { score: result.total, industry: answers.industry });
    setSubmitting(false);
    setStep('results');
  };

  if (step === 'intro') {
    return (
      <div className="pt-28 pb-20">
        <div className="container-page max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-sm font-medium mb-6">
            <BarChart2 className="w-4 h-4" />
            Free Marketing Assessment
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-almond-900 mb-6">
            Find Out What's Holding Your Marketing Back
          </h1>
          <p className="text-almond-600 text-lg leading-relaxed mb-8">
            Answer 8 quick questions about your business and marketing. We'll calculate
            your Marketing Growth Score and identify your highest-value opportunities.
            Takes less than 3 minutes.
          </p>
          <ul className="text-left space-y-3 mb-10 max-w-sm mx-auto">
            {[
              '8 questions — takes about 3 minutes',
              'Receive your Marketing Growth Score',
              'See your top growth opportunities',
              'No commitment required',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-almond-700 text-sm">
                <CheckCircle2 className="w-5 h-5 text-pink-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => { track(Events.ASSESSMENT_STARTED, { source: 'assessment_page' }); setStep('questions'); }}
            className="btn-primary text-lg px-8 py-4"
          >
            Start My Free Assessment
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (step === 'questions') {
    const progress = ((qIndex + 1) / questions.length) * 100;
    return (
      <div className="pt-28 pb-20">
        <div className="container-page max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-almond-500 mb-2">
              <span>Question {qIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="h-2 bg-almond-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="card p-8 sm:p-10">
            <h2 className="font-serif text-2xl text-almond-900 mb-6">{currentQ.label}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {currentQ.options.map((option) => {
                const selected = currentQ.multi
                  ? (answers.channels as string[]).includes(option)
                  : answers[currentQ.key as keyof Answers] === option;
                return (
                  <button
                    key={option}
                    onClick={() => selectOption(option)}
                    className={`p-4 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                      selected
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-almond-200 bg-white text-almond-700 hover:border-pink-300'
                    }`}
                  >
                    {selected && <CheckCircle2 className="w-4 h-4 inline mr-2 text-pink-500" />}
                    {option}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => qIndex === 0 ? setStep('intro') : setQIndex(qIndex - 1)}
                className="btn-ghost"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={nextQuestion}
                disabled={!canAdvance}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {qIndex === questions.length - 1 ? 'See My Results' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'capture') {
    return (
      <div className="pt-28 pb-20">
        <div className="container-page max-w-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4">
              <BarChart2 className="w-8 h-8 text-pink-600" />
            </div>
            <h2 className="font-serif text-3xl text-almond-900 mb-3">Your results are ready</h2>
            <p className="text-almond-600">
              Enter your details to see your Marketing Growth Score and personalized recommendations.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="a-name">Your Name *</label>
                <input id="a-name" className="input" value={contact.name} onChange={(e) => setContact((p) => ({ ...p, name: e.target.value }))} placeholder="Jane Smith" required />
              </div>
              <div>
                <label className="label" htmlFor="a-email">Work Email *</label>
                <input id="a-email" type="email" className="input" value={contact.email} onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))} placeholder="jane@company.com" required />
              </div>
            </div>
            <div>
              <label className="label" htmlFor="a-company">Company Name</label>
              <input id="a-company" className="input" value={contact.company} onChange={(e) => setContact((p) => ({ ...p, company: e.target.value }))} placeholder="Acme Inc." />
            </div>
            <div>
              <label className="label" htmlFor="a-phone">Phone (optional)</label>
              <input id="a-phone" className="input" value={contact.phone} onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))} placeholder="(555) 123-4567" />
            </div>
            <button type="submit" disabled={submitting} className="btn-primary w-full">
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" />Calculating…</> : <>See My Marketing Growth Score <ArrowRight className="w-4 h-4" /></>}
            </button>
            <p className="text-xs text-almond-400 text-center">We'll also send you a copy of your results by email.</p>
          </form>
        </div>
      </div>
    );
  }

  // Results
  if (step === 'results' && score) {
    const scoreColor = score.total >= 70 ? 'text-success-600' : score.total >= 45 ? 'text-warning-600' : 'text-pink-600';
    return (
      <div className="pt-28 pb-20">
        <div className="container-page max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl text-almond-900 mb-4">Your Marketing Growth Score</h1>
            <div className={`font-serif text-7xl font-bold mb-2 ${scoreColor}`}>{score.total}</div>
            <div className="text-almond-500 text-lg mb-2">out of 100</div>
            <p className="text-almond-600 text-sm max-w-md mx-auto">
              This is a preliminary assessment based on your answers. It identifies areas of opportunity — not a definitive audit.
            </p>
          </div>

          <div className="space-y-4 mb-10">
            {score.areas.map((area) => (
              <div key={area.name} className="card p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-serif text-almond-900">{area.name}</span>
                  <span className="font-semibold text-pink-600">{area.score}/100</span>
                </div>
                <div className="h-2 bg-almond-100 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-pink-500 rounded-full transition-all duration-700"
                    style={{ width: `${area.score}%` }}
                  />
                </div>
                <p className="text-xs text-almond-500">{area.note}</p>
              </div>
            ))}
          </div>

          <div className="card p-8 bg-gradient-to-br from-pink-50 to-tan-50 border-pink-100 text-center">
            <h2 className="font-serif text-2xl text-almond-900 mb-3">
              Want a Personalized 90-Day Growth Strategy?
            </h2>
            <p className="text-almond-600 mb-6">
              Book a free strategy consultation and we'll walk through your results,
              identify your highest-value opportunities, and outline a specific plan for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => { track(Events.CONSULTATION_STARTED, { source: 'assessment_results' }); navigate('contact'); }}
                className="btn-primary"
              >
                Book a Strategy Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('services')} className="btn-outline">
                Explore Our Services
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
