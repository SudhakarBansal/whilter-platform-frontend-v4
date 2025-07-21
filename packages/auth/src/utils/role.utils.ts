import { ALL_ROUTE_CONFIGS } from '../config';
import { PUBLIC_PATHS } from '../config/public.route';
import { Role } from '../config/roles/role';
import { SECTION_CONFIG } from '../config/section';

// Route access config for matched route
export function getRouteConfig(pathname: string) {
  return {
    config: ALL_ROUTE_CONFIGS[pathname],
  };
}

// Whether a route is public
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_PATHS.some((publicPath) => pathname.startsWith(publicPath));
}

// Get the redirect path (possibly cross-domain)
export function getRedirectPath(
  section?: keyof typeof SECTION_CONFIG,
  role?: Role,
  origin?: string
): string {
  const fallbackOrigin = origin || (typeof window !== 'undefined' ? window.location.origin : '')
  const config = section ? SECTION_CONFIG[section] : undefined

  if (!config) return `${fallbackOrigin}/platform`

  const { path, domain } = config
  const isLocalhost =
    fallbackOrigin.includes('localhost') || fallbackOrigin.includes('127.0.0.1')

  //  Use same origin in local dev or if no domain is defined
  if (isLocalhost || !domain) {
    return `${domain}`
  }

  return `https://${domain}`
}

