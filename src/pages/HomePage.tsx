import { useEffect, useState } from 'react';
import {
  Mail, CalendarCheck, Users, FileText, Phone, Sparkles,
  ArrowRight, Clock, ShieldCheck, HeartHandshake, ChevronDown, ChevronUp,
} from 'lucide-react';
import { navigate } from '@/lib/router';
import { LeadForm } from '@/components/LeadForm';
import { supabase, type PortfolioProject } from '@/lib/supabase';

const testimonials = [
  {
    quote: 'Petal Assist gave me back 20 hours a week. My inbox is under control and I can finally focus on growing my coaching practice.',
    name: 'Sarah M.',
    role: 'Business Coach',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  },
  {
    quote: 'The onboarding was seamless and my assistant understood my brand voice from day one. Worth every penny.',
    name: 'James T.',
    role: 'E-commerce Founder',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  },
  {
    quote: 'I was skeptical about delegating, but Petal Assist made it effortless. My customer response time went from 2 days to 2 hours.',
    name: 'Priya K.',
    role: 'Consultant',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  },
];

const steps = [
  { number: '01', title: 'Tell us what you need', desc: 'Fill out a short form about your business and the tasks you want to delegate.' },
  { number: '02', title: 'Meet your assistant', desc: 'We match you with a vetted VA who fits your industry and working style.' },
  { number: '03', title: 'Hand off and grow', desc: 'Your assistant gets to work. You get your time back — usually within 48 hours.' },
];

const faqs = [
  { q: 'How quickly can I get started?', a: 'Most clients are matched with an assistant and onboarded within 48 hours of signing up.' },
  { q: 'What if I need to change my plan?', a: 'All plans are month-to-month. You can upgrade, downgrade, or cancel at any time with no penalties.' },
  { q: 'Is my business information kept confidential?', a: 'Absolutely. All assistants sign NDAs and we follow strict data security practices. Your information never leaves our secure systems.' },
  { q: 'What tools do your assistants use?', a: 'Our VAs are trained on the most common business tools — Gmail, Outlook, Slack, Notion, Asana, QuickBooks, Shopify, and more. Just let us know what you use.' },
  { q: 'Can I communicate directly with my assistant?', a: 'Yes. You will have a dedicated point of contact and can communicate via email, Slack, or whatever tool you prefer.' },
];

const clientLogos = [
  'Bloom Studio', 'Apex Consulting', 'Nova Health', 'Crest & Co.', 'Luminary Media',
];

const services = [
  { icon: Mail, title: 'Inbox & Calendar', desc: 'Email triage, scheduling, and calendar coordination so you never miss a beat.' },
  { icon: Users, title: 'Customer Support', desc: 'Friendly, on-brand responses that keep your customers happy and loyal.' },
  { icon: FileText, title: 'Content & Admin', desc: 'Blog posts, social media, data entry, and document management handled.' },
  { icon: Phone, title: 'Bookkeeping', desc: 'Invoicing, expense tracking, and financial organization to stay on top of cash flow.' },
];

const stats = [
  { value: '150+', label: 'Clients Served' },
  { value: '12k+', label: 'Hours Saved' },
  { value: '98%', label: 'Satisfaction' },
  { value: '24h', label: 'Avg. Response' },
];

const values = [
  { icon: ShieldCheck, title: 'Trusted & Confidential', desc: 'Your data and business are handled with the utmost care and security.' },
  { icon: Clock, title: 'Reliable & On Time', desc: 'Deadlines met, every time. We treat your time like it is our own.' },
  { icon: HeartHandshake, title: 'Genuine Partnership', desc: 'We are invested in your success, not just checking off tasks.' },
];

export function HomePage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from('portfolio_projects')
      .select('*')
      .eq('published', true)
      .order('sort_order')
      .limit(3)
      .then(({ data }) => setProjects(data ?? []));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-tan-200/50 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Premium Virtual Assistant Services
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-almond-900 leading-[1.1] mb-6">
                Reclaim your time.<br />
                <span className="text-pink-600">Grow your business.</span>
              </h1>
              <p className="text-lg text-almond-600 leading-relaxed mb-8 max-w-lg">
                Petal Assist pairs you with skilled virtual assistants who handle the
                admin, so you can focus on the work only you can do.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => navigate('packages')} className="btn-primary">
                  View Packages
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a href="#contact" className="btn-outline">
                  Get a Free Consultation
                </a>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-12">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-serif text-2xl sm:text-3xl text-pink-600">{s.value}</div>
                    <div className="text-xs text-almond-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image card */}
            <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
                  alt="Virtual assistant at work"
                  className="w-full h-[420px] sm:h-[500px] object-cover"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-almond-900/30 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 max-w-[220px]">
                <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center flex-shrink-0">
                  <CalendarCheck className="w-5 h-5 text-success-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-almond-900">15+ hours saved</div>
                  <div className="text-xs text-almond-500">every week, per client</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client logos */}
      <section className="py-10 bg-white border-y border-almond-100">
        <div className="container-page">
          <p className="text-center text-xs font-medium text-almond-400 uppercase tracking-widest mb-6">Trusted by businesses like yours</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {clientLogos.map((name) => (
              <span key={name} className="font-serif text-lg text-almond-300 font-semibold">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-title">What we can do for you</h2>
            <p className="section-subtitle">
              From inbox management to content creation, our assistants are trained across
              the tasks that keep your business running.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="card-hover p-6 animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="font-serif text-lg text-almond-900 mb-2">{s.title}</h3>
                <p className="text-sm text-almond-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-title">Why clients choose us</h2>
            <p className="section-subtitle">We are not just task-doers. We are partners invested in your success.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-almond-100 flex items-center justify-center mx-auto mb-5">
                  <v.icon className="w-8 h-8 text-almond-700" />
                </div>
                <h3 className="font-serif text-xl text-almond-900 mb-2">{v.title}</h3>
                <p className="text-almond-500 text-sm leading-relaxed max-w-xs mx-auto">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-title">What our clients say</h2>
            <p className="section-subtitle">Real results from real business owners.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.name} className="card p-6 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-pink-400 fill-pink-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-almond-600 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                  <div>
                    <div className="text-sm font-semibold text-almond-900">{t.name}</div>
                    <div className="text-xs text-almond-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-title">How it works</h2>
            <p className="section-subtitle">From sign-up to hands-off in three simple steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-px bg-almond-200" />
            {steps.map((s, i) => (
              <div key={s.number} className="text-center animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4">
                  <span className="font-serif text-xl text-pink-600 font-bold">{s.number}</span>
                </div>
                <h3 className="font-serif text-lg text-almond-900 mb-2">{s.title}</h3>
                <p className="text-sm text-almond-500 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio preview */}
      {projects.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="container-page">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="section-title">Recent work</h2>
                <p className="section-subtitle">A glimpse of what we have done for clients like you.</p>
              </div>
              <button onClick={() => navigate('portfolio')} className="btn-ghost self-start sm:self-auto">
                View all projects <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => navigate('portfolio')}
                  className="card-hover overflow-hidden text-left animate-fade-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={p.image_url ?? ''}
                      alt={p.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <span className="badge bg-pink-50 text-pink-600 mb-2">{p.category}</span>
                    <h3 className="font-serif text-lg text-almond-900 mb-1">{p.title}</h3>
                    <p className="text-sm text-almond-500 line-clamp-2">{p.summary}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-page max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="section-title">Frequently asked questions</h2>
            <p className="section-subtitle">Everything you need to know before getting started.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-serif text-almond-900 text-base">{faq.q}</span>
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
      </section>

      {/* Lead capture */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Let's get started
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-almond-900 mb-4">
                Request your free consultation
              </h2>
              <p className="text-almond-600 text-lg leading-relaxed mb-8">
                Tell us a little about your business and what you need. We will follow up
                within one business day to schedule a no-pressure call and match you with
                the right assistant.
              </p>
              <ul className="space-y-3">
                {[
                  'No commitment — the consultation is completely free',
                  'We match you with an assistant who fits your industry',
                  'Flexible plans that scale as your needs grow',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-almond-700">
                    <CheckCircle2Small />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckCircle2Small() {
  return (
    <svg className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}
