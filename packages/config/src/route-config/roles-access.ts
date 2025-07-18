
import { PROTECTED_ROUTES } from '../route-config/protected';
import type { UserRole } from '../types/auth';

export const ROLE_REDIRECTS: Record<UserRole, string> = {
  superAdmin: 'https://tools.whilter.com',
  admin:  'https://charpai.whilter.com',
  contributor: 'https://tools.whilter.com',
  reviewer: 'https://marketplace.whilter.com',
  guest: 'https://marketplace.whilter.com',
};


export const ROLE_ACCESS_MAP: Record<UserRole, string[]> = {
  superAdmin: [
    PROTECTED_ROUTES.TOOLS,
    PROTECTED_ROUTES.MARKETPLACE,
    PROTECTED_ROUTES.CHARPAI,
  ],
  admin: [
    PROTECTED_ROUTES.TOOLS,
    PROTECTED_ROUTES.CHARPAI,
  ],
 guest: [],
  contributor: [PROTECTED_ROUTES.TOOLS],
  reviewer: [PROTECTED_ROUTES.MARKETPLACE]
};

export const validateRouteAccess = (role: UserRole, path: string): boolean => {
  return ROLE_ACCESS_MAP[role]?.some(route => path.startsWith(route)) ?? false;
};
