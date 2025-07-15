import jwt from 'jsonwebtoken';
import {jwtDecode} from 'jwt-decode';

import type { JwtPayload } from 'jsonwebtoken';
import type { UserRole } from '@whilter/config';

export interface TokenPayload extends JwtPayload {
  userId: string;
  role: UserRole;
  exp: number;
  iat: number;
}

/**
 * Verifies and decodes the token securely (used in backend/api).
 * @param token JWT token
 * @returns TokenPayload if valid
 */
export function verifyToken(token: string): Promise<TokenPayload> {
  return new Promise((resolve, reject) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) return reject(new Error('JWT_SECRET is not defined'));

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(
          err.name === 'TokenExpiredError'
            ? new Error('Token expired')
            : new Error('Invalid token')
        );
      }

      const payload = decoded as TokenPayload;

      if (!payload.userId || !payload.role) {
        return reject(new Error('Malformed token payload'));
      }

      // Ensure not expired (extra layer of protection)
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        return reject(new Error('Token expired'));
      }

      resolve(payload);
    });
  });
}

/**
 * Decodes token locally without verifying signature (used in client layouts/pages).
 * @param token JWT token
 * @returns TokenPayload or throws error
 */

export function getTokenPayload(token: string): TokenPayload {
  try {
    const payload = jwtDecode<TokenPayload>(token);
    if (!payload?.userId || !payload?.role) {
      throw new Error('Invalid token structure');
    }
    return payload;
  } catch (error) {
    console.error('Token decoding failed:', error);
    throw new Error('Failed to decode token');
  }
}