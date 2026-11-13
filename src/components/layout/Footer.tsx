import { useState } from 'react';
import { Mail, Instagram, Linkedin, Facebook, Send, CalendarDays } from 'lucide-react';
import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';
import { PanelArcs } from '@/components/shared/Decor';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  return done ? (
    <p className="text-sm text-teal-200">You're subscribed — thanks!</p>
  ) : (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email.trim()) setDone(true); }}
      className="flex gap-2"
    >
      <label htmlFor="footer-newsletter" className="sr-only">Email address</label>
      <input
        id="footer-newsletter"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-teal-100/50 focus:outline-none focus:ring-2 focus:ring-teal-300"
      />
      <button type="submit" className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-coral-600 transition-colors hover:bg-coral-700" aria-label="Subscribe">
        <Send className="h-4 w-4 text-white" />
      </button>
    </form>
  );
}

const exploreLinks = [
  { label: 'Home', path: '' },
  { label: 'Services', path: 'services' },
  { label: 'Results', path: 'results' },
  { label: 'Blog', path: 'blog' },
  { label: 'About', path: 'about' },
  { label: 'ROI Calculator', path: 'calculator' },
  { label: 'Free Assessment', path: 'assessment' },
  { label: 'FAQ', path: 'faq' },
  { label: 'Contact Us', path: 'contact' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-teal-50">
      <PanelArcs className="opacity-60" />
      <div className="container-page relative py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <img
              src="/virtually_assured_horizontal_logo.png"
              alt="Be Virtually Assured"
              width={714}
              height={283}
              loading="lazy"
              className="h-16 w-auto object-contain brightness-0 invert"
            />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-teal-50/80">
              We assist with the tasks you find mundane or complex, so that you can focus on more revenue generating activities. Let's get connected so we can get to know your unique business and build systems that produce measurable, repeatable growth.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/bevirtuallyassured?igsi=Y2x2NHpxd2RtZGt3&utm_source=qr', label: 'Instagram' },
                { Icon: Facebook, href: 'https://www.facebook.com/share/1cTXDAnCVC/?mibextid=wwXIfr', label: 'Facebook' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors hover:border-coral-500 hover:bg-coral-600"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </span>
            </div>
          </div>

          {/* Links */}
          <nav aria-label="Footer" className="lg:col-span-3">
            <h4 className="mb-5 font-serif text-lg !text-white">Explore</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm lg:grid-cols-1">
              {exploreLinks.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => navigate(l.path)}
                    className="text-teal-50/80 transition-colors hover:text-coral-300"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-2 lg:col-span-4">
            <h4 className="mb-5 font-serif text-lg !text-white">Get in Touch</h4>
            <a
              href="mailto:hello@bevirtuallyassured.com"
              className="inline-flex items-center gap-2 text-sm text-teal-50/80 transition-colors hover:text-coral-300"
            >
              <Mail className="h-4 w-4 text-coral-400" />
              hello@bevirtuallyassured.com
            </a>

            <div className="mt-7">
              <h4 className="mb-1.5 font-serif text-base !text-white">Marketing Growth Tips</h4>
              <p className="mb-3 text-xs text-teal-50/70">Practical strategies for business growth, delivered monthly.</p>
              <NewsletterForm />
            </div>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row lg:flex-col xl:flex-row">
              <button
                onClick={() => { track(Events.CONSULTATION_STARTED, { source: 'footer' }); navigate('contact'); }}
                className="btn-primary flex-1 px-5 text-sm"
              >
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Schedule Consultation
              </button>
              <button
                onClick={() => { track(Events.ASSESSMENT_STARTED, { source: 'footer' }); navigate('assessment'); }}
                className="btn-outline-light flex-1 px-5 text-sm focus-visible:ring-offset-navy"
              >
                Free Marketing Assessment
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-teal-50/70 sm:flex-row">
          <span>© {new Date().getFullYear()} Be Virtually Assured. All rights reserved.</span>
          <div className="flex gap-5">
            <button onClick={() => navigate('privacy')} className="transition-colors hover:text-coral-300">Privacy Policy</button>
            <button onClick={() => navigate('terms')} className="transition-colors hover:text-coral-300">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
