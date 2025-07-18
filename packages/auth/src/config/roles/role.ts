export enum Role {
  GUEST='guest',
  SUPER_ADMIN = 'super-admin',
  CLIENT_ADMIN='client-admin',
  CREATIVE_EDITOR = 'creative-editor',
  CREATIVE_CONTRIBUTOR = 'creative-contributor',
  CREATIVE_REVIEWER = 'creative-reviewer',
  CONTENT_CREATOR = 'content-creator',
  CAMPAIGN_MANAGER = 'campaign-manager',
  CAMPAIGN_REVIEWER = 'campaign-reviewer',
}

export function hasRole(user: any, roles: string[]) {
  return roles.includes(user?.role);
}

export function isSuperAdmin(user: any) {
  return user?.role === Role.SUPER_ADMIN;
}
