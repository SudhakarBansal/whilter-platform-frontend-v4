
export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  GUEST = 'GUEST',
  CLIENT_ADMIN = 'CLIENT_ADMIN',
  CAMPAIGN_MANAGER = 'campaign-manager',
  CREATIVE_CONTRIBUTOR = 'creative-contributor',
}

export const SECTIONS = {
  DASHBOARD: 'DASHBOARD',
  MEDIA_TOOLS: 'MEDIA_TOOLS',
  CHARP_AI: 'CHARP_AI',
  MARKETPLACE: 'MARKETPLACE'
} as const;

export type Section = (typeof SECTIONS)[keyof typeof SECTIONS];
