import { useState, useEffect } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';
import { navigate, useRouter } from '@/lib/router';
import { useAuth } from '@/context/AuthContext';
import { isAdmin } from '@/lib/supabase';
import { track, Events } from '@/lib/analytics';

const links = [
  { label: 'Services', path: 'services' },
  { label: 'Results', path: 'results' },
  { label: 'Insights', path: 'blog' },
  { label: 'About', path: 'about' },
  { label: 'Calculator', path: 'calculator' },
];

export function Navbar() {
  const route = useRouter();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => route.name === path;

  const handleNav = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleAssessment = () => {
    track(Events.ASSESSMENT_STARTED, { source: 'navbar' });
    handleNav('assessment');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-tan-50/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="container-page flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <button onClick={() => handleNav('')} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="font-serif text-xl text-almond-900 font-semibold">
            Nandi Marketing
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.path}
              onClick={() => handleNav(l.path)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive(l.path)
                  ? 'text-pink-700 bg-pink-50'
                  : 'text-almond-700 hover:text-pink-600 hover:bg-pink-50/50'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleAssessment}
            className="hidden md:inline-flex btn-primary text-sm py-2 px-5"
          >
            Free Assessment
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
            <button onClick={() => handleNav('login')} className="hidden md:inline-flex btn-ghost text-sm">
              Client Login
            </button>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2.5 rounded-full hover:bg-pink-50 transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5 text-almond-700" /> : <Menu className="w-5 h-5 text-almond-700" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-tan-50 border-t border-almond-100 animate-fade-in">
          <div className="container-page py-4 flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l.path}
                onClick={() => handleNav(l.path)}
                className={`px-4 py-3 rounded-xl text-left text-sm font-medium transition ${
                  isActive(l.path) ? 'text-pink-700 bg-pink-50' : 'text-almond-700 hover:bg-pink-50/50'
                }`}
              >
                {l.label}
              </button>
            ))}
            <button onClick={handleAssessment} className="btn-primary mt-2">
              Free Marketing Assessment
            </button>
            <button
              onClick={() => { track(Events.CONSULTATION_STARTED, { source: 'navbar_mobile' }); handleNav('contact'); }}
              className="btn-outline mt-2"
            >
              Book a Consultation
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
