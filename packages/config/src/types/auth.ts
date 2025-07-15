
export type UserRole = 
  | 'superAdmin'
  | 'admin'
  | 'contributor'
  | 'reviewer'
  | 'guest';


export interface AuthUser {
  id: string;
  role: UserRole;
  email: string;
  name: string;
}

export interface AuthTokenPayload {
  userId: string;
  role: UserRole;
  exp: number;
  iat?: number;
}


export type TokenPair = {
  accessToken: string;
  refreshToken?: string;
};