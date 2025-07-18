// packages/auth/session.ts
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './options';

type Credentials = {
  email: string;
  password: string;
};


export function auth(req: NextApiRequest, res: NextApiResponse) {
  return getServerSession(req, res, authOptions);
}

export async function getSession() {
  return await getServerSession(authOptions);
}


export async function getUserDetailsFromDB(credentials: Credentials) {
  // Replace with real DB lookup
  if (credentials.email === 'admin@whilter.ai' && credentials.password === 'test123') {
    return {
      id: '1',
      name: 'Admin User',
      email: 'admin@whilter.ai',
      role: 'super-admin',
      organization: 'whilter-ai',
      status: 'active',
    };
  }

  return null;
}
