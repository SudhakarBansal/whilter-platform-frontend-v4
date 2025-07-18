
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './options';

// For use in API routes
export function auth(req: NextApiRequest, res: NextApiResponse) {
  return getServerSession(req, res, authOptions);
}

// For use in server components or middleware
export async function getSession() {
  return await getServerSession(authOptions);
}
