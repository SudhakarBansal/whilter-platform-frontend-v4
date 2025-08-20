// src/types/next-auth.d.ts
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    refreshToken:string;
    deviceId:string;

    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      organization: string;
      section: string;
      userId: string;
      active:boolean;
      exp:number;
    };
  }

  interface User {
    id: string;
    accessToken: string;
    refreshToken:string;
    deviceId:string;
    exp: number;
    role: string;
    organization: string;
    section: string;
    userId: string;
    email: string;
    name: string;
    active:boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    deviceId?: string;
    role?: string;
    organization?: string;
    section?: string;
    userId?: string;
    email?: string;
    name?: string;
    active?: boolean;
    accessTokenExp?: number;
  }
}