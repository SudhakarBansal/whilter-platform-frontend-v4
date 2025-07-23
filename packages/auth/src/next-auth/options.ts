// pages/api/auth/[...nextauth].ts
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
          const response = await authService.login({
            email: credentials?.email ?? '',
            password: credentials?.password ?? '',
          });
          
          if (response?.data) {
            return response.data;
          }
          return null;
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      },
    }),
  ],
 
  callbacks: {
    async jwt({ token, user }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        
        // Decode and add claims to token
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
