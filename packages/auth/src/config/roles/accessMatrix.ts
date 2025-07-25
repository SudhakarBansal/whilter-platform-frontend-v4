
import { Role } from './role';
import { SECTIONS, Section } from './role';

export type RoleAccessMatrix = Record<Role, Section[]>;

export const roleAccessMatrix: RoleAccessMatrix = {
  [Role.SUPER_ADMIN]: [
    SECTIONS.DASHBOARD,
    SECTIONS.MEDIA_TOOLS,
    SECTIONS.MARKETPLACE,
    SECTIONS.CHARP_AI,
  ],
  [Role.CLIENT_ADMIN]: [
    SECTIONS.MEDIA_TOOLS,
    SECTIONS.CHARP_AI,
  ],
  [Role.GUEST]: [
    SECTIONS.MEDIA_TOOLS,
  ],
   [Role.CREATIVE_EDITOR]: [
    SECTIONS.MEDIA_TOOLS,
  ],
  [Role.CAMPAIGN_MANAGER]: [
    SECTIONS.CHARP_AI,
  ],
  [Role.CREATIVE_CONTRIBUTOR]: [
    SECTIONS.MARKETPLACE,
  ],
};
