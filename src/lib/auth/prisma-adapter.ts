import { Adapter, AdapterSession, AdapterUser } from 'next-auth/adapters'
import { prisma } from '../prisma'

interface ReturnGetSessionAndUser {
  session: AdapterSession
  user: AdapterUser
}

export function PrismaAdapter(): Adapter {
  return {
    async createUser(user): {},

    async getUser(id): Promise<AdapterUser | null> {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email || '',
        emailVerified: null,
        avatar_url: user.avatar_url || '',
      }
    },

    async getUserByEmail(email): Promise<AdapterUser | null> {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email || '',
        emailVerified: null,
        avatar_url: user.avatar_url || '',
      }
    },

    async getUserByAccount({
      providerAccountId,
      provider,
    }): Promise<AdapterUser | null> {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) return null

      const { user } = account
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email || '',
        emailVerified: null,
        avatar_url: user.avatar_url || '',
      }
    },

    async updateUser(user): Promise<AdapterUser> {
      if (!user?.id) {
        throw new Error('User ID not found.')
      }

      const prismaUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        username: prismaUser.username,
        email: prismaUser.email || '',
        emailVerified: null,
        avatar_url: prismaUser.avatar_url || '',
      }
    },

    async deleteUser(userId) {},

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },

    async createSession({
      sessionToken,
      userId,
      expires,
    }): Promise<AdapterSession> {
      const prismaSession = await prisma.session.create({
        data: {
          session_token: sessionToken,
          user_id: userId,
          expires,
        },
      })

      return {
        expires: prismaSession.expires,
        sessionToken: prismaSession.session_token,
        userId: prismaSession.user_id,
      }
    },

    async getSessionAndUser(
      sessionToken,
    ): Promise<ReturnGetSessionAndUser | null> {
      const prismaSession = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })

      if (!prismaSession) {
        return null
      }

      const { user, ...session } = prismaSession

      return {
        session: {
          expires: session.expires,
          sessionToken: session.session_token,
          userId: session.user_id,
        },
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email || '',
          emailVerified: null,
          avatar_url: user.avatar_url || '',
        },
      }
    },

    async updateSession({
      sessionToken,
      expires,
      userId,
    }): Promise<AdapterSession> {
      const prismaSession = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          user_id: userId,
        },
      })

      return {
        expires: prismaSession.expires,
        sessionToken: prismaSession.session_token,
        userId: prismaSession.user_id,
      }
    },
  }
}
