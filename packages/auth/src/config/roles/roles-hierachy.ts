

import { Role } from './role'

export const ROLE_HIERARCHY: Record<Role, Role[]> = {
  [Role.SUPER_ADMIN]: Object.values(Role), // Full access
  [Role.CLIENT_ADMIN]: [
    Role.CONTENT_CREATOR,
    Role.CREATIVE_EDITOR,
    Role.CREATIVE_CONTRIBUTOR,
    Role.CREATIVE_REVIEWER,
    Role.CAMPAIGN_MANAGER,
    Role.CAMPAIGN_REVIEWER,
    Role.GUEST,
  ],
  [Role.CONTENT_CREATOR]: [],
  [Role.CREATIVE_EDITOR]: [],
  [Role.CREATIVE_CONTRIBUTOR]: [],
  [Role.CREATIVE_REVIEWER]: [],
  [Role.CAMPAIGN_MANAGER]: [],
  [Role.CAMPAIGN_REVIEWER]: [],
  [Role.GUEST]: [],
}
