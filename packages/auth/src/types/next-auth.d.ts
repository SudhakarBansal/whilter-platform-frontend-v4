
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      section?: string;
      organization?: string;
      accessibleApps?: string[];
      permissions?: string[];
    };
  }
  interface JWT {
    id: string
    name: string
    email: string
    role: Role
    section?: string
    organization?: string
    accessToken?: string
    accessibleApps: AppIdentifier[]
    permissions: string[]
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: string;
    section?: string;
    status?: string;
    organization?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    section?: string;
    organization?: string;
    accessToken?: string;
    accessibleApps?: string[];
    permissions?: string[];
  }
}

