
import { Role } from '../roles/role'
import { RouteAccessConfig } from '@whilter/auth/types/route.types'

export const PLATFORM_ROUTES: Record<string, RouteAccessConfig> = {
 '/platform': {
    allowedRoles: [Role.SUPER_ADMIN,Role.CLIENT_ADMIN],
  },
  
}