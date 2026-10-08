import { useEffect, useState } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'services' }
  | { name: 'results' }
  | { name: 'portfolio' }
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

function parsePath(): Route {
  const path = window.location.pathname.replace(/^\//, '').split('?')[0];
  switch (path) {
    case 'services':    return { name: 'services' };
    case 'results':     return { name: 'results' };
    case 'portfolio':   return { name: 'portfolio' };
    case 'about':       return { name: 'about' };
    case 'blog':        return { name: 'blog' };
    case 'assessment':  return { name: 'assessment' };
    case 'calculator':  return { name: 'calculator' };
    case 'contact':     return { name: 'contact' };
    case 'privacy':     return { name: 'privacy' };
    case 'terms':       return { name: 'terms' };
    case 'login':       return { name: 'login' };
    case 'dashboard':   return { name: 'dashboard' };
    case 'admin':       return { name: 'admin' };
    case 'onboarding':  return { name: 'onboarding' };
    default:            return { name: 'home' };
  }
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(parsePath());

  useEffect(() => {
    const onPop = () => {
      setRoute(parsePath());
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return route;
}

export function navigate(path: string) {
  const url = path === '' ? '/' : '/' + path;
  window.history.pushState({}, '', url);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
