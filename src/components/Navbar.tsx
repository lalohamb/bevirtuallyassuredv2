import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigate, useRouter } from '@/lib/router';
import { useAuth } from '@/context/AuthContext';
import { isAdmin } from '@/lib/supabase';
import { track, Events } from '@/lib/analytics';

const links = [
  { label: 'About', path: 'about' },
  { label: 'Services', path: 'services' },
  { label: 'Blog', path: 'blog' },
];

export function Navbar() {
  const route = useRouter();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useState(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  });

  const isActive = (path: string) => route.name === path;

  const handleNav = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleConsultation = () => {
    track(Events.CONSULTATION_STARTED, { source: 'navbar' });
    handleNav('contact');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <nav className="container-page flex items-center justify-between h-24 sm:h-28">
        {/* Logo */}
        <button onClick={() => handleNav('')} className="flex items-center group">
          <img
            src="/virtually_assured_horizontal_logo.png"
            alt="Be Virtually Assured"
            className="h-20 sm:h-24 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            fetchPriority="high"
          />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.path}
              onClick={() => handleNav(l.path)}
              className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all ${
                isActive(l.path)
                  ? 'text-pink-600 bg-pink-50'
                  : 'text-almond-700 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleConsultation}
            className="hidden md:inline-flex btn-primary text-sm py-2.5 px-6 font-semibold tracking-wide"
          >
            Free Consultation
          </button>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              {isAdmin(user) && (
                <button onClick={() => handleNav('admin')} className="btn-ghost text-sm">Admin</button>
              )}
              <button onClick={() => handleNav('dashboard')} className="btn-ghost text-sm">Dashboard</button>
              <button onClick={signOut} className="btn-outline text-sm">Sign Out</button>
            </div>
          ) : (
            <button onClick={() => handleNav('login')} className="hidden md:inline-flex text-almond-600 hover:text-pink-600 text-sm font-medium px-3 py-2 transition-colors">
              Client Login
            </button>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5 text-almond-700" /> : <Menu className="w-5 h-5 text-almond-700" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-almond-100 shadow-lg animate-fade-in">
          <div className="container-page py-5 flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l.path}
                onClick={() => handleNav(l.path)}
                className={`px-4 py-3 rounded-xl text-left text-sm font-medium transition ${
                  isActive(l.path) ? 'text-pink-600 bg-pink-50' : 'text-almond-700 hover:bg-pink-50'
                }`}
              >
                {l.label}
              </button>
            ))}
            <button onClick={handleConsultation} className="btn-primary mt-2">
              Free Consultation
            </button>
            <button
              onClick={() => { track(Events.ASSESSMENT_STARTED, { source: 'navbar_mobile' }); handleNav('assessment'); }}
              className="btn-outline mt-2"
            >
              Free Marketing Assessment
            </button>
            {user ? (
              <>
                {isAdmin(user) && (
                  <button onClick={() => handleNav('admin')} className="px-4 py-3 rounded-xl text-left text-sm text-pink-700 font-medium hover:bg-pink-50/50">Admin</button>
                )}
                <button onClick={() => handleNav('dashboard')} className="px-4 py-3 rounded-xl text-left text-sm text-almond-700 hover:bg-pink-50/50">Dashboard</button>
                <button onClick={signOut} className="px-4 py-3 rounded-xl text-left text-sm text-pink-600 hover:bg-pink-50/50">Sign Out</button>
              </>
            ) : (
              <button onClick={() => handleNav('login')} className="px-4 py-3 rounded-xl text-left text-sm text-almond-500 hover:bg-pink-50/50">Client Login</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
