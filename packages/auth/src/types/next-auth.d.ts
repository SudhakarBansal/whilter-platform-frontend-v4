import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: {
      name?: string;
      email?: string;
      image?: string;
      role: string;
      organization: string;
      section: string;
      userId: string;
    };
  }

  interface User {
    accessToken: string;
    role?: string;
    organization?: string;
    section?: string;
    userId?: string;
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
  }
}