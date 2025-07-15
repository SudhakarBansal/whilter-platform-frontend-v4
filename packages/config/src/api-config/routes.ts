
export const ROUTES = {
  PUBLIC: {
    LOGIN: '/login',
    HOME: '/platform'
  },
  PROTECTED: {
    TOOLS: '/tools',
    CHARPAI: '/platform/admin',
    MARKETPLACE: '/platform/user'
  }
} as const;

export type UserRole = 'admin' | 'user';

export const ROLE_REDIRECTS: Record<UserRole, string> = {
  admin: ROUTES.PROTECTED.ADMIN,
  user: ROUTES.PROTECTED.USER
};