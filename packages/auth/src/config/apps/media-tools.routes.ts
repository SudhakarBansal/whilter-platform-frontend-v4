
import { Role } from '../roles/role'
import { RouteAccessConfig } from '../../types/route.type'

export const MEDIA_TOOLS_ROUTES: Record<string, RouteAccessConfig> = {
'/media-tools/view': {
    allowedRoles: [Role.GUEST],
    requiredPermissions: ['tools:review'],
    requiredApp: 'media-tools'
  },
  
}
