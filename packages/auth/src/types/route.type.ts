import { Role } from '../config/roles/role';

export type AppIdentifier = 'main' | 'charp-ai' | 'marketplace' | 'media-tools';

export interface RouteAccessConfig {
  allowedRoles: Role[];
  requiredPermissions?: string[];
  requiredApp?: AppIdentifier;
  redirectAfterLogin?: string;
  redirectUnauthenticated?:string;
  redirectUnauthorized?:string;
  public?: boolean;
}
