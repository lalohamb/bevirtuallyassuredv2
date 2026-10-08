import { useState } from 'react';
import { Mail, Instagram, Linkedin, Facebook, Send } from 'lucide-react';
import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  return done ? (
    <p className="text-success-500 text-xs">You're subscribed — thanks!</p>
  ) : (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email.trim()) setDone(true); }}
      className="flex gap-2"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 px-3 py-2 rounded-lg bg-almond-800 border border-almond-700 text-tan-100 placeholder-almond-500 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <button type="submit" className="p-2 rounded-lg bg-pink-500 hover:bg-pink-600 transition-colors" aria-label="Subscribe">
        <Send className="w-4 h-4 text-white" />
      </button>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="bg-almond-900 text-tan-100 mt-24">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img src="/logo.png" alt="Be Virtually Assured" className="h-14 w-auto object-contain brightness-0 invert" />
            </picture>
            </div>
            <p className="text-tan-200 text-sm leading-relaxed max-w-sm">
              We assist with the tasks you find mundane or complex, so that you can focus on more revenue generating activities. Let's get connected so we can get to know your unique business and build systems that produce measurable, repeatable growth.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/bevirtuallyassured?igsi=Y2x2NHpxd2RtZGt3&utm_source=qr', label: 'Instagram' },
                { Icon: Facebook, href: 'https://www.facebook.com/share/1cTXDAnCVC/?mibextid=wwXIfr', label: 'Facebook' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-almond-800 hover:bg-pink-500 flex items-center justify-center transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <span
                className="w-9 h-9 rounded-full bg-almond-800 flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Home', path: '' },
                { label: 'Services', path: 'services' },
                { label: 'Results', path: 'results' },
                { label: 'Blog', path: 'blog' },
                { label: 'About', path: 'about' },
                { label: 'Calculator', path: 'calculator' },
                { label: 'Contact Us', path: 'contact' },
              ].map((l) => (
                <li key={l.path}>
                  <button
                    onClick={() => navigate(l.path)}
                    className="text-tan-200 hover:text-pink-300 transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-tan-200">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink-400" />
                <a href="mailto:hello@bevirtuallyassured.com" className="hover:text-pink-300 transition-colors">hello@bevirtuallyassured.com</a>
              </li>

            </ul>

            <div className="mt-6">
              <h4 className="font-serif text-base text-white mb-2">Marketing Growth Tips</h4>
              <p className="text-tan-300 text-xs mb-3">Practical strategies for business growth, delivered monthly.</p>
              <NewsletterForm />
            </div>

            <div className="mt-6">
              <button
                onClick={() => { track(Events.ASSESSMENT_STARTED, { source: 'footer' }); navigate('assessment'); }}
                className="btn-primary text-sm w-full"
              >
                Free Marketing Assessment
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-almond-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-tan-300">
          <span>© {new Date().getFullYear()} Be Virtually Assured. All rights reserved.</span>
          <div className="flex gap-4">
            <button onClick={() => navigate('privacy')} className="hover:text-pink-300 transition-colors">Privacy Policy</button>
            <button onClick={() => navigate('terms')} className="hover:text-pink-300 transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
