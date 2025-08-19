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
      active:boolean,
    };
  }

  interface User {
    accessToken: string;
    refreshToken:string;
    deviceId:string;
    role: string;
    organization: string;
    section: string;
    userId: string;
    email: string;
    active:boolean,
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    role: string;
    organization: string;
    section: string;
    userId: string;
    email: string;
    active:boolean,
  }
}
