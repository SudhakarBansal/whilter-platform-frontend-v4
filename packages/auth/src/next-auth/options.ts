
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authService } from '@whilter/api';
import { decodeJwt } from '../utils/jwt';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const response = await authService.login({
            email: credentials.email,
            password: credentials.password,
          });
console.log("respoinse",response)
          const { accessToken } = response?.data || {};
          if (!accessToken) return null;
          const decoded = decodeJwt(accessToken);
          if (!decoded) return null;
          return {
            id: decoded.userId,
            email: decoded.email,
            role: decoded.role,
            userId: decoded.userId,
            organization: decoded.organization,
            section: decoded.section,
            accessToken,
          };
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      }

    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        const decoded = decodeJwt(user.accessToken);
        if (decoded) {
          token.role = decoded.role;
          token.organization = decoded.organization;
          token.section = decoded.section;
          token.userId = decoded.userId;
          token.email = decoded.email;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
        session.user = {
          ...session.user,
          role: token.role,
          organization: token.organization,
          section: token.section,
          userId: token.userId,
          email: token.email,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
