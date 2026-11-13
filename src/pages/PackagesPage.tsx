import { useEffect, useState } from 'react';
import { Check, Star, ShoppingBag, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { supabase, type Package } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { navigate } from '@/lib/router';
import { formatPrice } from '@/lib/format';

export function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const { addPackage } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    supabase
      .from('packages')
      .select('*')
      .eq('active', true)
      .order('sort_order')
      .then(({ data, error }) => {
        if (!error) setPackages(data ?? []);
        setLoading(false);
      });
  }, []);

  const handleAdd = (pkg: Package) => {
    addPackage(pkg);
    navigate('checkout');
  };

  return (
    <div className="py-12 sm:py-16 bg-gradient-to-b from-cream-100 to-cream-50">
      <div className="container-page">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral-100 text-coral-700 text-sm font-medium mb-5">
            <Sparkles className="w-4 h-4" />
            Simple, transparent pricing
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-ink-900 mb-4">Choose your plan</h1>
          <p className="text-ink-600 text-lg">
            Every plan includes a dedicated assistant, weekly progress reports, and the
            flexibility to change or cancel anytime.
          </p>
        </div>

        {/* Reassurance strip */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            { title: 'No long-term contracts', desc: 'Plans are month-to-month. Cancel or change anytime.' },
            { title: 'Unused hours roll over', desc: 'Up to 25% of unused hours carry into the next month.' },
            { title: 'Secure & confidential', desc: 'NDAs available. Your data stays private and protected.' },
          ].map((item) => (
            <div key={item.title} className="card p-5 text-center">
              <h4 className="font-serif text-base text-ink-900 mb-1">{item.title}</h4>
              <p className="text-sm text-ink-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Cards */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-coral-500" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {packages.map((pkg, i) => (
              <div
                key={pkg.id}
                className={`relative card p-6 flex flex-col animate-fade-up ${
                  pkg.popular ? 'ring-2 ring-coral-400 shadow-lg lg:scale-105' : ''
                }`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-coral-500 text-white text-xs font-semibold shadow-sm">
                      <Star className="w-3 h-3 fill-white" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="font-serif text-xl text-ink-900 mb-1">{pkg.name}</h3>
                  <p className="text-sm text-ink-500">{pkg.tagline}</p>
                </div>

                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-4xl text-ink-900">
                      {formatPrice(pkg.price_cents)}
                    </span>
                    <span className="text-ink-400 text-sm">
                      /{pkg.billing_period}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-ink-600 leading-relaxed mb-5">{pkg.description}</p>

                <ul className="space-y-2.5 mb-6 flex-grow">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink-700">
                      <span className="w-5 h-5 rounded-full bg-coral-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-coral-600" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleAdd(pkg)}
                  className={pkg.popular ? 'btn-primary w-full' : 'btn-outline w-full'}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Testimonials */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {[
            { quote: 'Switching to Petal Assist was the best business decision I made this year. My assistant handles everything I used to dread.', name: 'Rachel B.', role: 'Online Course Creator' },
            { quote: 'The Starter plan was perfect to test the waters. I upgraded to Growth within the first month — that says it all.', name: 'David L.', role: 'Marketing Consultant' },
          ].map((t) => (
            <div key={t.name} className="card p-6">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-coral-400 fill-coral-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <p className="text-ink-600 text-sm italic mb-4">"{t.quote}"</p>
              <div className="text-sm font-semibold text-ink-900">{t.name} <span className="font-normal text-ink-400">— {t.role}</span></div>
            </div>
          ))}
        </div>

        {/* FAQ / reassurance */}
        <div className="mt-10 grid sm:grid-cols-3 gap-6">
          {[
            { title: 'No long-term contracts', desc: 'Plans are month-to-month. Cancel or change anytime.' },
            { title: 'Unused hours roll over', desc: 'Up to 25% of unused hours carry into the next month.' },
            { title: 'Secure & confidential', desc: 'NDAs available. Your data stays private and protected.' },
          ].map((item) => (
            <div key={item.title} className="card p-5 text-center">
              <h4 className="font-serif text-base text-ink-900 mb-1">{item.title}</h4>
              <p className="text-sm text-ink-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        {!user && (
          <div className="mt-12 text-center card p-8 bg-gradient-to-br from-ink-50 to-cream-100 border-ink-100">
            <h2 className="font-serif text-2xl text-ink-900 mb-2">Already a client?</h2>
            <p className="text-ink-600 mb-5">Sign in to manage your plan and access your dashboard.</p>
            <button onClick={() => navigate('login')} className="btn-primary">
              Client Login <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
