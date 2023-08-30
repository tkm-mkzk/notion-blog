import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { Adapter, AdapterUser } from 'next-auth/adapters'

const prisma = new PrismaClient()

export const prismaAdapter: Adapter = {
  ...PrismaAdapter(prisma),

  // メールアドレスでの検索不可とする
  getUserByEmail: () => null,

  // email = null として User を登録する
  createUser: async (data) => {
    const user = await prisma.user.create({ data: { ...data, email: null } })
    return user as AdapterUser
  },
}

export const authOptions: NextAuthOptions = {
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    //   authorization: {
    //     params: { scope: 'repo' },
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      if (typeof token.sub === 'string') {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/signup`
    },
  },
  adapter: prismaAdapter,
}

export default NextAuth(authOptions)
