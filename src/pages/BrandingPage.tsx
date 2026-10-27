import { ArrowRight, Check, Layers } from 'lucide-react';
import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';

const deliverables = [
  'Brand positioning and differentiation',
  'Messaging architecture',
  'Customer value proposition',
  'Brand voice and tone guidelines',
  'Competitive differentiation strategy',
  'Brand architecture (if applicable)',
];

export function BrandingPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-page">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mx-auto mb-5">
            <Layers className="w-6 h-6 text-pink-600" />
          </div>
          <span className="text-xs font-semibold text-pink-500 uppercase tracking-widest mb-3 block">Brand Strategy</span>
          <h1 className="font-serif text-4xl sm:text-5xl text-almond-900 mb-4">
            Position Your Brand to Win the Right Clients
          </h1>
          <p className="text-almond-600 text-lg leading-relaxed">
            If your brand looks and sounds like everyone else in your market, you're competing on price. Strong positioning lets you compete on value.
          </p>
        </div>

        {/* Problem / Outcome */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl bg-almond-50 border border-almond-100">
            <p className="text-xs font-semibold text-almond-500 uppercase tracking-wide mb-2">The Problem</p>
            <p className="text-almond-700 leading-relaxed">
              If your brand looks and sounds like everyone else in your market, you're competing on price. Strong positioning lets you compete on value.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-pink-50 border border-pink-100">
            <p className="text-xs font-semibold text-pink-500 uppercase tracking-wide mb-2">The Outcome</p>
            <p className="text-almond-700 leading-relaxed">
              A clear brand position, differentiated messaging, and a customer value proposition that resonates with your ideal clients and justifies premium pricing.
            </p>
          </div>
        </div>

        {/* Image + Deliverables */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
              alt="Brand Strategy"
              className="w-full h-80 object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="font-serif text-2xl text-almond-900 mb-6">What's Included</h2>
            <ul className="space-y-3 mb-8">
              {deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-almond-700">
                  <span className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-pink-600" />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
            <button
              onClick={() => { track(Events.CONSULTATION_STARTED, { source: 'branding_page' }); navigate('contact'); }}
              className="btn-primary"
            >
              Schedule A Free Consultation <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="card p-10 sm:p-14 bg-gradient-to-br from-almond-900 to-almond-800 border-0 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
            Ready to differentiate your brand?
          </h2>
          <p className="text-tan-200 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Let's build a brand position that attracts the right clients and lets you compete on value — not price.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => { track(Events.CONSULTATION_STARTED, { source: 'branding_cta' }); navigate('contact'); }}
              className="btn-primary"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('services')}
              className="btn border-2 border-tan-300 text-tan-100 hover:bg-tan-700/30"
            >
              View All Services
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
