

import { Role } from '../roles/role';
import { RouteAccessConfig } from '../../types/route.type';

export const MARKETPLACE_ROUTES: Record<string, RouteAccessConfig> = {
  '/marketplace/library/edit': {
    allowedRoles: [Role.CREATIVE_EDITOR],
    requiredPermissions: ['content:edit'],
    requiredApp: 'marketplace'
  },
  '/marketplace/library/upload': {
    allowedRoles: [Role.CREATIVE_CONTRIBUTOR],
    requiredPermissions: ['content:upload'],
    requiredApp: 'marketplace',
  
  },
};


