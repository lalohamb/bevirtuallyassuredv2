import { useEffect, useState } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'services' }
  | { name: 'results' }
  | { name: 'about' }
  | { name: 'blog' }
  | { name: 'assessment' }
  | { name: 'calculator' }
  | { name: 'contact' }
  | { name: 'privacy' }
  | { name: 'terms' }
  | { name: 'login' }
  | { name: 'dashboard' }
  | { name: 'admin' }
  | { name: 'onboarding' };

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  switch (hash) {
    case 'services': return { name: 'services' };
    case 'results': return { name: 'results' };
    case 'about': return { name: 'about' };
    case 'blog': return { name: 'blog' };
    case 'assessment': return { name: 'assessment' };
    case 'calculator': return { name: 'calculator' };
    case 'contact': return { name: 'contact' };
    case 'privacy': return { name: 'privacy' };
    case 'terms': return { name: 'terms' };
    case 'login': return { name: 'login' };
    case 'dashboard': return { name: 'dashboard' };
    case 'admin': return { name: 'admin' };
    case 'onboarding': return { name: 'onboarding' };
    default: return { name: 'home' };
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
