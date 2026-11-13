import { HIGH_PRIORITY } from '@/lib/format';
import { useEffect, useRef, useState } from 'react';
import { CalendarDays, ChevronDown, Menu, UserRound, X } from 'lucide-react';
import { navigate, useRouter } from '@/lib/router';
import { useAuth } from '@/context/AuthContext';
import { isAdmin } from '@/lib/supabase';
import { track, Events } from '@/lib/analytics';
import { PRIMARY_NAV, isGroup, type NavGroup, type NavItem } from '@/lib/navigation';

/** Closes a popover on outside click or Escape. */
function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);
  return ref;
}

const linkBase =
  'relative px-3 xl:px-4 py-2 text-[0.95rem] font-medium transition-colors after:absolute after:left-3 after:right-3 xl:after:left-4 xl:after:right-4 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-opacity';

function linkClass(active: boolean) {
  return `${linkBase} ${
    active ? 'text-navy after:bg-coral-500 after:opacity-100' : 'text-ink-700 hover:text-teal-700 after:opacity-0'
  }`;
}

function Dropdown({
  group,
  active,
  onNavigate,
}: {
  group: NavGroup;
  active: boolean;
  onNavigate: (path: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  const id = `nav-${group.label.toLowerCase()}`;

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className={`${linkClass(active)} inline-flex items-center gap-1`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        {group.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open && (
        <div id={id} className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
          <ul className="card w-64 p-2 animate-fade-in">
            {group.items.map((item) => (
              <li key={item.path}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onNavigate(item.path);
                  }}
                  className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-ink-700 transition hover:bg-teal-50 hover:text-teal-800"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function AccountMenu({ onNavigate }: { onNavigate: (path: string) => void }) {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  if (!user) return null;
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="nav-account"
        aria-label="Account menu"
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink-700 hover:bg-cream-100"
      >
        <UserRound className="h-4 w-4" aria-hidden="true" />
        <span className="hidden xl:inline">Account</span>
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </button>
      {open && (
        <ul id="nav-account" className="card absolute right-0 top-full z-50 mt-2 w-48 p-2 animate-fade-in">
          {isAdmin(user) && (
            <li>
              <button onClick={() => { setOpen(false); onNavigate('admin'); }} className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-ink-700 hover:bg-teal-50">
                Admin
              </button>
            </li>
          )}
          <li>
            <button onClick={() => { setOpen(false); onNavigate('dashboard'); }} className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-ink-700 hover:bg-teal-50">
              Dashboard
            </button>
          </li>
          <li>
            <button onClick={() => { setOpen(false); signOut(); }} className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-coral-700 hover:bg-coral-50">
              Sign Out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export function Header() {
  const route = useRouter();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [route.name]);

  const handleNav = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleConsultation = () => {
    track(Events.CONSULTATION_STARTED, { source: 'navbar' });
    handleNav('contact');
  };

  const itemActive = (item: NavItem) => route.name === item.match;
  const groupActive = (group: NavGroup) => group.match.includes(route.name);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm transition-shadow duration-300 ${
        scrolled ? 'shadow-soft' : 'border-b border-cream-200'
      }`}
    >
      <nav aria-label="Primary" className="container-page flex h-20 items-center justify-between gap-4 lg:h-[92px]">
        {/* Logo */}
        <button onClick={() => handleNav('')} className="flex flex-shrink-0 items-center" aria-label="Be Virtually Assured — home">
          <img
            src="/virtually_assured_horizontal_logo.png"
            alt="Be Virtually Assured"
            width={714}
            height={283}
            className="h-14 w-auto object-contain lg:h-[72px]"
            {...HIGH_PRIORITY}
          />
        </button>

        {/* Desktop navigation */}
        <div className="hidden items-center lg:flex">
          {PRIMARY_NAV.map((item) =>
            isGroup(item) ? (
              <Dropdown key={item.label} group={item} active={groupActive(item)} onNavigate={handleNav} />
            ) : (
              <button
                key={item.label}
                onClick={() => handleNav(item.path)}
                className={linkClass(itemActive(item))}
                aria-current={itemActive(item) ? 'page' : undefined}
              >
                {item.label}
              </button>
            ),
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            {user ? (
              <AccountMenu onNavigate={handleNav} />
            ) : (
              <button
                onClick={() => handleNav('login')}
                aria-label="Client Login"
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full p-2.5 text-sm font-medium text-ink-600 transition-colors hover:bg-cream-100 hover:text-teal-700 xl:px-3 xl:py-2"
              >
                <UserRound className="h-5 w-5 xl:hidden" aria-hidden="true" />
                <span className="hidden xl:inline">Client Login</span>
              </button>
            )}
          </div>
          <button onClick={handleConsultation} className="btn-primary hidden whitespace-nowrap px-5 py-2.5 sm:inline-flex">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Free Consultation
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-full p-2.5 text-navy transition-colors hover:bg-cream-100 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-cream-200 bg-white shadow-lift animate-fade-in lg:hidden"
        >
          <div className="container-page flex flex-col gap-1 py-5">
            {PRIMARY_NAV.map((item) =>
              isGroup(item) ? (
                <div key={item.label} className="py-2">
                  <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{item.label}</p>
                  {item.items.map((sub) => (
                    <button
                      key={sub.path}
                      onClick={() => handleNav(sub.path)}
                      className="block w-full rounded-xl px-4 py-2.5 text-left text-[0.95rem] text-ink-700 hover:bg-teal-50"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.path)}
                  aria-current={itemActive(item) ? 'page' : undefined}
                  className={`rounded-xl px-4 py-3 text-left text-[0.95rem] font-medium ${
                    itemActive(item) ? 'bg-teal-50 text-navy' : 'text-ink-700 hover:bg-teal-50'
                  }`}
                >
                  {item.label}
                </button>
              ),
            )}
            <button onClick={handleConsultation} className="btn-primary mt-3">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Free Consultation
            </button>
            <div className="mt-3 border-t border-cream-200 pt-3">
              {user ? (
                <>
                  {isAdmin(user) && (
                    <button onClick={() => handleNav('admin')} className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-ink-700 hover:bg-teal-50">Admin</button>
                  )}
                  <button onClick={() => handleNav('dashboard')} className="block w-full rounded-xl px-4 py-3 text-left text-sm text-ink-700 hover:bg-teal-50">Dashboard</button>
                  <button onClick={signOut} className="block w-full rounded-xl px-4 py-3 text-left text-sm text-coral-700 hover:bg-coral-50">Sign Out</button>
                </>
              ) : (
                <button onClick={() => handleNav('login')} className="block w-full rounded-xl px-4 py-3 text-left text-sm text-ink-600 hover:bg-teal-50">Client Login</button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
