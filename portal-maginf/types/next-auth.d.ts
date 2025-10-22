import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      clientId: string
      client: {
        id: string
        name: string
        slug: string
        logo?: string
        settings?: {
          primaryColor: string
          secondaryColor: string
          customLogo?: string
        }
      }
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role: string
    clientId: string
    client: any
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: string
    clientId: string
    client: any
  }
}
