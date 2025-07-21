import { ALL_ROUTE_CONFIGS } from '../config';
import { PUBLIC_PATHS } from '../config/public.route';
import { Role } from '../config/roles/role';
import { SECTION_REDIRECT_MAP } from '../config/roles/section';

export function getRouteConfig(pathname: string) {
  return {
    config: ALL_ROUTE_CONFIGS[pathname],
  };
}

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_PATHS.some((publicPath) => pathname.startsWith(publicPath));
}
export function getRedirectPath(section?: string, role?: Role): string {
  if (section && SECTION_REDIRECT_MAP[section]) {
    return SECTION_REDIRECT_MAP[section];
  }

  return '/platform';
}