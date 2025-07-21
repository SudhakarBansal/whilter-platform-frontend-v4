
import { Role } from '../roles/role'
import { RouteAccessConfig } from '../../types/route.type'

export const PLATFORM_ROUTES: Record<string, RouteAccessConfig> = {
 '/platform': {
    allowedRoles: Object.values(Role),
    requiredPermissions: ['platform:review'],
    requiredApp: 'main'
  },
  
}