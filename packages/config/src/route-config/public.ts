// packages/shared/config/routes/public.ts

import type { UserRole } from '../types/auth';

export const PUBLIC_ROUTES = {
  LOGIN: '/login',
  HOME: {
    superAdmin: '/platform',
    admin: '/platform',
    contributor: '/platform',
    reviewer: '/platform',
    guest: '/platform',
  } satisfies Record<UserRole, string>,
} as const;

export type PublicRoute = keyof typeof PUBLIC_ROUTES;
