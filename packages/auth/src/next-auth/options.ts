import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '@whilter/api';
import { decodeJwt } from '../utils/jwt';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        accessToken: { label: 'AccessToken', type: 'text' },
        refreshToken: { label: 'RefreshToken', type: 'text' },
        deviceId: { label: 'DeviceId', type: 'text' },

      },
      async authorize(credentials) {
        try {
          if (credentials?.accessToken && credentials?.refreshToken) {
            const decoded = decodeJwt(credentials.accessToken);
     
            if (!decoded) return null;

            // Ensure section is always an array
            const section = Array.isArray(decoded.section)
              ? decoded.section
              : decoded.section
                ? [decoded.section]
                : [];

            return {
              id: decoded.userId,
              name: decoded.name,
              email: decoded.email,
              role: decoded.role,
              userId: decoded.userId,
              organization: decoded.organization,
              section,
              active: decoded.active,
              accessToken: credentials.accessToken,
              refreshToken: credentials.refreshToken,
              deviceId: credentials.deviceId,
              exp: decoded.exp || 0,
            };
          }

          if (credentials?.email && credentials?.password) {
            const response = await login({
              email: credentials.email,
              password: credentials.password,
            });

            const { accessToken, refreshToken, deviceId } = response?.data || {};
            if (!accessToken) return null;

            const decoded = decodeJwt(accessToken);
            if (!decoded) return null;

            // Ensure section is always an array
            const section = Array.isArray(decoded.section)
              ? decoded.section
              : decoded.section
                ? [decoded.section]
                : [];

            return {
              id: decoded.userId,
              name: decoded.name,
              email: decoded.email,
              role: decoded.role,
              userId: decoded.userId,
              active: decoded.active,
              organization: decoded.organization,
              section,
              exp: decoded.exp || 0,
              accessToken,
              refreshToken,
              deviceId,

            };
          }

          return null;
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      },
    }),
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    async jwt({ token, user }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.deviceId = user.deviceId;

        const decoded = decodeJwt(user.accessToken);
        if (decoded) {
          token.role = decoded.role;
          token.organization = decoded.organization;
          token.section = Array.isArray(decoded.section)
            ? decoded.section
            : decoded.section
              ? [decoded.section]
              : [];
          token.userId = decoded.userId;
          token.email = decoded.email;
          token.name = decoded.name;
          token.active = decoded.active;
          token.accessTokenExp = decoded.exp || 0;
        }
      }
      return token;
    },

    async session({ session, token }) {

      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.deviceId = token.deviceId as string;

      session.user = {
        ...session.user,
        role: token.role as string,
        organization: token.organization as string,
        section:(token.section as string[] | undefined) ?? [],
        userId: token.userId as string,
        email: token.email as string,
        name: token.name as string,
        exp: token.accessTokenExp as number, 
        active: Boolean(token.active),
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
