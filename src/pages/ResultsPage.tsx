import { useEffect, useState } from 'react';
import { ArrowRight, X, Loader2, TrendingUp } from 'lucide-react';
import { supabase, type PortfolioProject } from '@/lib/supabase';
import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';
import { PageHero } from '@/components/shared/PageHero';
import { CallToAction } from '@/components/shared/CallToAction';

const PLACEHOLDER_CASES = [
  {
    id: 'placeholder-1',
    slug: 'professional-services-lead-gen',
    title: 'Increase in Qualified Leads for Professional Services Firm',
    client_name: 'Professional Services Client',
    category: 'Lead Generation',
    summary: 'A B2B professional services firm was generating website traffic but converting less than 1% of visitors into leads. We redesigned their lead funnel and implemented a content-driven SEO strategy.',
    description: 'The client had strong brand recognition in their local market but no systematic approach to converting website visitors into qualified leads. Their website was informational rather than conversion-focused, and they had no lead nurture process in place.',
    services: ['Lead Funnel Design', 'SEO Strategy', 'Conversion Optimization', 'Email Automation'],
    image_url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
    result: 'Placeholder — to be replaced with verified client results.',
    sort_order: 1,
    published: true,
  },
  {
    id: 'placeholder-2',
    slug: 'smb-brand-positioning',
    title: 'Brand Repositioning for Growing SMB',
    client_name: 'SMB Client',
    category: 'Brand Strategy',
    summary: 'A growing service business was competing on price because their positioning was indistinguishable from competitors. We developed a differentiated brand strategy and messaging architecture.',
    description: 'The client had been in business for 8 years and had strong customer retention, but struggled to attract new clients at their desired price point. Their marketing communicated what they did, not why it mattered.',
    services: ['Brand Positioning', 'Messaging Architecture', 'Customer Value Proposition', 'Website Messaging'],
    image_url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
    result: 'Placeholder — to be replaced with verified client results.',
    sort_order: 2,
    published: true,
  },
  {
    id: 'placeholder-3',
    slug: 'digital-marketing-system',
    title: 'Integrated Digital Marketing System for E-Commerce Brand',
    client_name: 'E-Commerce Client',
    category: 'Digital Marketing',
    summary: 'An e-commerce brand was running paid ads, email, and social media as disconnected activities. We built an integrated demand-generation system that coordinated all channels.',
    description: 'The client was spending significantly on paid advertising but had no email nurture sequence, no SEO strategy, and no way to attribute revenue to specific marketing activities. Each channel was managed independently with no unified strategy.',
    services: ['Paid Advertising', 'Email Marketing', 'SEO', 'Analytics & Attribution'],
    image_url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    result: 'Placeholder — to be replaced with verified client results.',
    sort_order: 3,
    published: true,
  },
];

export function ResultsPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<PortfolioProject | null>(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    supabase
      .from('portfolio_projects')
      .select('*')
      .eq('published', true)
      .order('sort_order')
      .then(({ data, error }) => {
        setProjects(error || !data || data.length === 0 ? PLACEHOLDER_CASES as PortfolioProject[] : data);
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))) as string[]];
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  const openCase = (p: PortfolioProject) => {
    setActive(p);
    track(Events.CASE_STUDY_VIEWED, { slug: p.slug });
  };

  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title={<>Client <span className="text-highlight">Results</span></>}
        description={
          <p>
            Real strategies, real execution, real outcomes. Here's how we've helped
            businesses turn marketing into a measurable growth engine.
          </p>
        }
      >
        <div className="mx-auto max-w-xl rounded-xl border border-cream-300 bg-white/70 p-3 text-xs text-ink-500">
          Case studies below are structural placeholders. All client results will be verified and published with client permission.
        </div>
      </PageHero>

      <section className="section bg-white pt-12 sm:pt-16">
      <div className="container-page">
        {!loading && projects.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={filter === c ? 'pill-active' : 'pill-idle'}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <button
                key={p.id}
                onClick={() => openCase(p)}
                className="card-hover overflow-hidden text-left animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={p.image_url ?? ''}
                    alt={p.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <span className="badge bg-teal-50 text-teal-800 mb-3">{p.category}</span>
                  <h3 className="font-serif text-xl font-semibold leading-snug mb-2">{p.title}</h3>
                  <p className="text-sm text-ink-600 leading-relaxed line-clamp-2">{p.summary}</p>
                  <div className="link-arrow mt-4 text-sm">
                    Read case study <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

      </div>
      </section>

      <CallToAction
        title="Ready to build your own growth story?"
        description="Start with a free marketing assessment and we'll identify your highest-value opportunities."
        actions={
          <>
            <button
              onClick={() => { track(Events.ASSESSMENT_STARTED, { source: 'results_cta' }); navigate('assessment'); }}
              className="btn-primary"
            >
              Get Your Free Marketing Assessment
            </button>
            <button onClick={() => navigate('contact')} className="btn-outline">Book a Consultation</button>
          </>
        }
      />

      {/* Case study modal */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-2xl">
              <img src={active.image_url ?? ''} alt={active.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-ink-700" />
              </button>
            </div>
            <div className="p-6 sm:p-8">
              <span className="badge bg-teal-50 text-teal-800 mb-3">{active.category}</span>
              <h2 className="font-serif text-2xl text-ink-900 mb-4">{active.title}</h2>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-ink-50 border border-ink-100">
                  <p className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-1">The Challenge</p>
                  <p className="text-sm text-ink-700 leading-relaxed">{active.description}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-ink-700 mb-2">Services Applied</h4>
                  <div className="flex flex-wrap gap-2">
                    {active.services.map((s) => (
                      <span key={s} className="badge bg-cream-100 text-cream-700">{s}</span>
                    ))}
                  </div>
                </div>
                {active.result && (
                  <div className="rounded-xl bg-coral-50 border border-coral-100 p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-coral-100 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-coral-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-coral-700">Result</div>
                      <div className="text-sm text-ink-600">{active.result}</div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => { setActive(null); track(Events.ASSESSMENT_STARTED, { source: 'case_study_modal' }); navigate('assessment'); }}
                className="btn-primary w-full"
              >
                Get a Similar Strategy for Your Business
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
