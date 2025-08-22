
import { getServerSession } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { authOptions } from './options';

// For use in API routes
export function auth(req: NextApiRequest, res: NextApiResponse) {
  return getServerSession(req, res, authOptions);
}

// For use in server components or middleware
export async function getSession() {
  return await getServerSession(authOptions);
}

export function getAuth() {
  return NextAuth(authOptions);
}

// Export the handler directly for route usage
export const authHandler = NextAuth(authOptions);