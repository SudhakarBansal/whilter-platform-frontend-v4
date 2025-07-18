// packages/auth/src/next-auth/options.ts
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

        // 🔐 Replace this with your real login API
        const { data } = await authService.loginWithEmail({
          email: credentials.email,
          password: credentials.password,
        })

        // Ensure user object has all required fields
        if (!data?.email || !data?.role || !data?.status) return null

        return {
          id: data.id,
          name: data.name,
          email: data.email,
          image: data.image ?? null,
          role: data.role,
          status: data.status,
          organization: data.organization,
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
        token.role = user.role
        token.status = user.status
        token.organization = user.organization
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.status = token.status as string
        session.user.organization = token.organization as string
      }
      return session
    },
  },
}
