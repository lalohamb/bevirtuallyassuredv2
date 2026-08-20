import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Sparkles } from 'lucide-react';
import { navigate, useRouter } from '@/lib/router';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { isAdmin } from '@/lib/supabase';

const links = [
  { label: 'Home', path: '' },
  { label: 'About', path: 'about' },
  { label: 'Services', path: 'services' },
  { label: 'Portfolio', path: 'portfolio' },
  { label: 'Packages', path: 'packages' },
  { label: 'Blog', path: 'blog' },
];

export function Navbar() {
  const route = useRouter();
  const { count } = useCart();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => route.name === (path || 'home');

  const handleNav = (path: string) => {
    navigate(path);
    setOpen(false);
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
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-serif text-xl text-almond-900 font-semibold">
            Petal Assist
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
          {/* Free Consultation CTA */}
          <button
            onClick={() => handleNav('')}
            className="hidden md:inline-flex btn-primary text-sm py-2 px-4"
          >
            Free Consultation
          </button>
          {/* Cart */}
          <button
            onClick={() => handleNav('checkout')}
            className="relative p-2.5 rounded-full hover:bg-pink-50 transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5 text-almond-700" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-pink-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          {/* Auth */}
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              {isAdmin(user) && (
                <button onClick={() => handleNav('admin')} className="btn-ghost text-sm">
                  Admin
                </button>
              )}
              <button
                onClick={() => handleNav('dashboard')}
                className="btn-ghost text-sm"
              >
                Dashboard
              </button>
              <button onClick={signOut} className="btn-outline text-sm">
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNav('login')}
              className="hidden md:inline-flex btn-primary text-sm"
            >
              Client Login
            </button>
          )}

          {/* Mobile toggle */}
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
            <button
              onClick={() => { handleNav(''); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}
              className="btn-primary mt-2"
            >
              Free Consultation
            </button>
            {user ? (
              <>
                {isAdmin(user) && (
                  <button onClick={() => handleNav('admin')} className="px-4 py-3 rounded-xl text-left text-sm text-pink-700 font-medium hover:bg-pink-50/50">
                    Admin Dashboard
                  </button>
                )}
                <button onClick={() => handleNav('dashboard')} className="px-4 py-3 rounded-xl text-left text-sm text-almond-700 hover:bg-pink-50/50">
                  Dashboard
                </button>
                <button onClick={signOut} className="px-4 py-3 rounded-xl text-left text-sm text-pink-600 hover:bg-pink-50/50">
                  Sign Out
                </button>
              </>
            ) : (
              <button onClick={() => handleNav('login')} className="btn-primary mt-2">
                Client Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
