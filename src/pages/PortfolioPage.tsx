import { useEffect, useState } from 'react';
import { ArrowRight, X, Loader2 } from 'lucide-react';
import { supabase, type PortfolioProject } from '@/lib/supabase';
import { navigate } from '@/lib/router';

export function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<PortfolioProject | null>(null);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    supabase
      .from('portfolio_projects')
      .select('*')
      .eq('published', true)
      .order('sort_order')
      .then(({ data, error }) => {
        if (!error) setProjects(data ?? []);
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))) as string[]];
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="pt-28 pb-20">
      <div className="container-page">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl text-almond-900 mb-4">Our Portfolio</h1>
          <p className="text-almond-600 text-lg">
            Real results for real businesses. Explore how we have helped clients
            save time, streamline operations, and grow.
          </p>
        </div>

        {/* Filters */}
        {!loading && projects.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  filter === c
                    ? 'bg-pink-500 text-white shadow-sm'
                    : 'bg-white text-almond-600 border border-almond-200 hover:border-pink-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-almond-500 py-20">No projects to show yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(p)}
                className="card-hover overflow-hidden text-left animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={p.image_url ?? ''}
                    alt={p.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="badge bg-pink-50 text-pink-600 mb-2">{p.category}</span>
                  <h3 className="font-serif text-lg text-almond-900 mb-1">{p.title}</h3>
                  <p className="text-sm text-almond-500 line-clamp-2">{p.summary}</p>
                  <div className="flex items-center gap-1 mt-3 text-pink-600 text-sm font-medium">
                    Read case study <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Client logo strip */}
        <div className="mt-12 py-8 border-y border-almond-100 text-center">
          <p className="text-xs font-medium text-almond-400 uppercase tracking-widest mb-5">Clients we have worked with</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['Bloom Studio', 'Apex Consulting', 'Nova Health', 'Crest & Co.', 'Luminary Media'].map((name) => (
              <span key={name} className="font-serif text-lg text-almond-300 font-semibold">{name}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center card p-10 bg-gradient-to-br from-pink-50 to-tan-100 border-pink-100">
          <h2 className="font-serif text-2xl text-almond-900 mb-3">Ready to be our next success story?</h2>
          <p className="text-almond-600 mb-6">Let's talk about how we can support your business.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate('')} className="btn-primary">Request a Consultation</button>
            <button onClick={() => navigate('packages')} className="btn-outline">View Packages</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-almond-900/50 backdrop-blur-sm animate-fade-in"
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
              >
                <X className="w-5 h-5 text-almond-700" />
              </button>
            </div>
            <div className="p-6 sm:p-8">
              <span className="badge bg-pink-50 text-pink-600 mb-3">{active.category}</span>
              <h2 className="font-serif text-2xl text-almond-900 mb-1">{active.title}</h2>
              <p className="text-sm text-almond-400 mb-4">Client: {active.client_name}</p>
              <p className="text-almond-600 leading-relaxed mb-6">{active.description}</p>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-almond-700 mb-2">Services provided</h4>
                <div className="flex flex-wrap gap-2">
                  {active.services.map((s) => (
                    <span key={s} className="badge bg-tan-100 text-tan-700">{s}</span>
                  ))}
                </div>
              </div>

              {active.result && (
                <div className="rounded-xl bg-success-50 border border-success-100 p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-success-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-success-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-success-700">Result</div>
                    <div className="text-sm text-success-600">{active.result}</div>
                  </div>
                </div>
              )}

              <button
                onClick={() => { setActive(null); navigate(''); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
                className="btn-primary w-full mt-6"
              >
                Book a similar project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
