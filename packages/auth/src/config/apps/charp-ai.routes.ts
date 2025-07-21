import { Role } from '../roles/role';
import { RouteAccessConfig } from '../../types/route.type';

export const CHARP_AI_ROUTES: Record<string, RouteAccessConfig> = {
  '/charp-ai/campaigns': {
    allowedRoles: [Role.CAMPAIGN_MANAGER],
    requiredPermissions: ['campaign:manage'],
    requiredApp: 'charp-ai'
  },
  '/charp-ai/campaigns/review': {
    allowedRoles: [Role.CAMPAIGN_REVIEWER],
    requiredPermissions: ['campaign:review'],
    requiredApp: 'charp-ai'
  },
};
