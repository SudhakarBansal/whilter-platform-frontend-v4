
import jwt, { type JwtPayload } from 'jsonwebtoken';

export interface DecodedToken extends JwtPayload {
  email: string;
  userId: string;
  role: string;
  organization: string;
  section: string;
}

export function decodeJwt(token: string): DecodedToken | null {
  const decoded = jwt.decode(token);
  if (!decoded || typeof decoded !== 'object') return null;
  return decoded as DecodedToken;
}
