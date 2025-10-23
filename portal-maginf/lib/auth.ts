import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('Credenciais não fornecidas')
            return null
          }

          console.log('Tentando autenticar:', credentials.email)

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            },
            include: {
              client: {
                include: {
                  settings: true
                }
              }
            }
          })

          if (!user || !user.active) {
            console.log('Usuário não encontrado ou inativo:', credentials.email)
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            console.log('Senha incorreta para:', credentials.email)
            return null
          }

          // Atualizar último login
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
          })

          console.log('Login bem-sucedido:', credentials.email)

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            clientId: user.clientId,
            client: user.client
          }
        } catch (error) {
          console.error('Erro na autorização:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 horas
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-key',
  pages: {
    signIn: '/login',
    error: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.clientId = user.clientId
        token.client = user.client
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.clientId = token.clientId as string
        session.user.client = token.client as any
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Redirecionar para dashboard após login
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  debug: process.env.NODE_ENV === 'development'
}
