import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
   interface Session extends DefaultSession {
      user: {
         id: number
         username: string
         email: string
         provider: string
         confirmed: boolean
         blocked: boolean
         createdAt: string
         updatedAt: string
         image?: string
         jwt: string
      }
   }

   interface User {
      id: number
      username: string
      email: string
      provider: string
      confirmed: boolean
      blocked: boolean
      createdAt: string
      updatedAt: string
      jwt: string
      image?: string
   }
}

declare module "next-auth/jwt" {
   interface JWT {
      expires: string
      user: {
         id: number
         username: string
         email: string
         provider: string
         confirmed: boolean
         blocked: boolean
         createdAt: string
         updatedAt: string
         jwt: string
         image?: string
      }
   }
}
