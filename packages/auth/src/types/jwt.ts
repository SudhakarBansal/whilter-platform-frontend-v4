
export interface JwtPayload {
  iat: number;     
  exp: number;     
  jti: string;      
  sub: string;      


  role: string; 
  organization: string;
  name: string;
  active: boolean;
  section: string; 
  userId: string;
  email: string;
}