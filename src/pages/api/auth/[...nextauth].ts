import prisma from '@/utils/prisma';
import nextAuth, { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 5 * 60 * 60
  },
  jwt: {
    maxAge: 5 * 60 * 60
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Your email...' },
        password: { label: 'Password', type: 'password', placeholder: 'Your password...' },
      },
      async authorize(credentials: any) {
        if (!credentials) {
          throw new Error('no credentials provider!')
        }
        const { email, password } = credentials

        const users = await prisma.user.findMany({ where: { email } })
        if (users.length === 0) {
          throw new Error('Invalid Email or Password')
        }
        const user = users[0]
        return user
      }
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PRIVATE_GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PRIVATE_GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.provider === 'credentials' && user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.emailVerified = user.emailVerified
        token.items = user.items
      }

      if (account?.provider === 'google') {
        const existingUser = await prisma.user.findMany({ where: { email: user.email } })

        if (existingUser.length > 0) {
          const user = existingUser[0]
          token.id = user.id
          token.name = user.name
          token.email = user.email
          token.emailVerified = user.emailVerified
          token.items = user.items
        } else {
          const newUser = await prisma.user.create({
            data: {
              name: user.name,
              email: user.email || '',
              password: "",
              emailVerified: true,
              type: 'google',
              items: [],
            }
          })
          token.id = newUser.id
          token.name = newUser.name
          token.email = newUser.email
          token.emailVerified = newUser.emailVerified
          token.items = newUser.items
        }
        return token
      }
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          emailVerified: token.emailVerified,
          items: token.items,
          type: token.type
        } as any
      }

      return session
    }
  }
}

export default nextAuth(authOptions)