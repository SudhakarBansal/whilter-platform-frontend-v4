// packages/shared/config/routes/protected.ts
import { PUBLIC_ROUTES } from './public';

/**
 * Protected routes that require authentication.
 */
export const PROTECTED_ROUTES = {
  TOOLS: '/tools',
  CHARPAI: '/charpai',
  MARKETPLACE: '/marketplace',
} as const;

/**
 * All routes (public + protected).
 */
export const ALL_ROUTES = {
  ...PUBLIC_ROUTES,
  ...PROTECTED_ROUTES,
} as const;

/**
 * Extract union types of protected route keys & values.
 */
export type ProtectedRouteKey = keyof typeof PROTECTED_ROUTES;
export type ProtectedRoutePath = typeof PROTECTED_ROUTES[ProtectedRouteKey];

/**
 * Extract union types of all route paths.
 */
export type RoutePath = typeof ALL_ROUTES[keyof typeof ALL_ROUTES];
