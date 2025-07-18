
  import { Role } from '../roles/role'
import { RouteAccessConfig } from '@whilter/auth/types/route.types'
  
  export const MARKETPLACE_ROUTES: Record<string, RouteAccessConfig> = {
    '/marketplace/library/edit': {
    allowedRoles: [Role.CREATIVE_EDITOR],
  },
  '/marketplace/library/upload': {
    allowedRoles: [Role.CREATIVE_CONTRIBUTOR],
  },
  '/marketplace/library/get': {
    allowedRoles: [Role.CREATIVE_REVIEWER],
  },
  '/marketplace/library': {
    allowedRoles: [Role.CONTENT_CREATOR],
    redirectAfterLogin: '/marketplace',
  },
  }