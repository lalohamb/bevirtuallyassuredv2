import { useEffect, useState } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'portfolio' }
  | { name: 'packages' }
  | { name: 'login' }
  | { name: 'onboarding' }
  | { name: 'dashboard' }
  | { name: 'checkout' }
  | { name: 'about' }
  | { name: 'services' }
  | { name: 'blog' }
  | { name: 'privacy' }
  | { name: 'terms' }
  | { name: 'admin' };

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  switch (hash) {
    case 'portfolio':
      return { name: 'portfolio' };
    case 'packages':
      return { name: 'packages' };
    case 'login':
      return { name: 'login' };
    case 'onboarding':
      return { name: 'onboarding' };
    case 'dashboard':
      return { name: 'dashboard' };
    case 'checkout':
      return { name: 'checkout' };
    case 'about':
      return { name: 'about' };
    case 'services':
      return { name: 'services' };
    case 'blog':
      return { name: 'blog' };
    case 'privacy':
      return { name: 'privacy' };
    case 'terms':
      return { name: 'terms' };
    case 'admin':
      return { name: 'admin' };
    default:
      return { name: 'home' };
  }
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(parseHash());

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return route;
}

export function navigate(path: string) {
  window.location.hash = '#/' + path;
}
