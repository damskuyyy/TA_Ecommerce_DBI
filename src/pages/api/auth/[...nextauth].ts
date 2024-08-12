import prisma from '@/utils/prisma';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt'


const secret = process.env.NEXT_PRIVATE_SECRET_PASS_KEY

const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_PRIVATE_JWT_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 5 * 60 * 60,
  },
  jwt: {
    maxAge: 5 * 60 * 60,
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
          throw new Error('No credentials provider!');
        }
        const { email, password } = credentials;

        const users = await prisma.user.findMany({ where: { email } });
        if (users.length === 0) {
          throw new Error('Invalid Email or Password');
        }
        const user = users[0]

        const isPassMatch = bcrypt.compareSync(password + secret, user.password)

        if (isPassMatch) {
          return user
        } else {
          throw new Error('failed to auth!')
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PRIVATE_GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PRIVATE_GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.provider === 'credentials' && user) {
        token.id = user.id
      }

      if (account?.provider === 'google') {
        const existingUser = await prisma.user.findFirst({ where: { email: user.email } });

        if (existingUser) {
          token.id = existingUser.id
        } else {
          const newUser = await prisma.user.create({
            data: {
              name: user.name,
              email: user.email || '',
              password: "",
              emailVerified: true,
              type: 'google',
              image: user.image || '',
              items: [],
              phone: user.phone || ''
            },
          });
          token.id = newUser.id;
        }
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = {
          id: token.id
        }
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
