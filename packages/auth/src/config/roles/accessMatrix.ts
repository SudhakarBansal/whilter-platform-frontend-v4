import { Role } from "./role";

export type AccessMatrixType = Record<
  string,
  {
    roles: Role[];
    sections?: string[];
  }
>;

export const accessMatrix: AccessMatrixType = {
  'media-tools': {
    roles: [Role.SUPER_ADMIN],
    sections: ['media-tools', 'marketplace', 'charp-ai'],
  },
  'charp-ai': {
    roles: [Role.CLIENT_ADMIN, Role.CAMPAIGN_MANAGER],
    sections: ['charp-ai'],
  },
  'marketplace': {
    roles: [Role.SUPER_ADMIN, Role.CREATIVE_CONTRIBUTOR],
    sections: ['marketplace'],
  },
};
