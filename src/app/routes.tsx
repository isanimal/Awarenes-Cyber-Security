export type Route = 'home' | 'trainer';

export function getRoute(): Route {
  return window.location.pathname === '/trainer' ? 'trainer' : 'home';
}

export function navigate(path: '/' | '/trainer'): void {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('popstate'));
}
