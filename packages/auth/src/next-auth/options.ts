import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authService } from '@whilter/api';
import {ROLES_HIERARCHY } from '../config/roles/hierachy';
import { Role } from '../config/roles/role';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const response = await authService.login({
          email: credentials.email,
          password: credentials.password,
        });
        const data = response?.data || {};

        if (!data?.email || !data?.role || !data?.accessToken) return null;

        return {
          id: data.id,
          name: data.name,
          email: data.email,
          image: data.image ?? null,
          role: data.role,
          status: data.status,
          organization: data.organization,
          accessToken: data.accessToken,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
  strategy: 'jwt',
},


  callbacks: {
   async jwt({ token, user }) {
  if (user) {
    const roleHierarchy = ROLES_HIERARCHY[user.role as Role] || {};
    
    // Get permissions from API
    const apiResponse = await authService.getUserPermissions({ userId: user.id });
    const apiPermissions = apiResponse.data || [];
    
    // Get permissions from role hierarchy
    const globalPermissions = roleHierarchy.globalPermissions || [];
    const appPermissions = Object.values(roleHierarchy.appSpecificPermissions || {}).flat();
    
    return {
      ...token,
      id: user.id,
      role: user.role,
      organization: user.organization,
      accessibleApps: roleHierarchy.accessibleApps || [],
      permissions: [...apiPermissions, ...globalPermissions, ...appPermissions],
    };
  }
  return token;
},
 async session({ session, token }) {
  return {
    ...session,
    accessToken: token.accessToken,
    user: {
      ...session.user,
      id: token.id,
      name: token.name,
      email: token.email,
      role: token.role,
      section: token.section,          
      organization: token.organization,
      accessibleApps: token.accessibleApps,
      permissions: token.permissions,
    },
  };
}
  },
};