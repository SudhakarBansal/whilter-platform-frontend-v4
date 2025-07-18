import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authService } from '@whilter/api'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const { data } = await authService.loginWithEmail({
          email: credentials.email,
          password: credentials.password,
        })

        if (!data?.email || !data?.role || !data?.accessToken) return null

        return {
          id: data.id,
          name: data.name,
          email: data.email,
          image: data.image ?? null,
          role: data.role,
          status: data.status,
          organization: data.organization,
          accessToken: data.accessToken, 
        }
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
      token.role = user.role;
      token.status = user.status;
      token.organization = user.organization;
      token.accessToken = user.accessToken; 
    }
    return token;
  },
   async session({ session, token }) {
    if (session.user) {
      session.user.role = token.role as string;
      session.user.status = token.status as string;
      session.user.organization = token.organization as string;
    }
    session.accessToken = token.accessToken as string;
    return session;
  },
  },
  
}
