import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "next-auth/core/types"

export const authOptions: NextAuthOptions = {
   session: {
      strategy: "jwt",
      // maxAge: 30 * 24 * 60 * 60, // 30 days
   },

   providers: [
      CredentialsProvider({
         type: "credentials",
         // The name to display on the sign in form (e.g. "Sign in with...")
         name: "Credentials",
         // `credentials` is used to generate a form on the sign in page.
         // You can specify which fields should be submitted, by adding keys to the `credentials` object.
         // e.g. domain, username, password, 2FA token, etc.
         // You can pass any HTML attribute to the <input> tag through the object.
         credentials: {
            username: {
               label: "Username",
               type: "text",
               placeholder: "jsmith",
            },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials, req) {
            if (!credentials) {
               throw new Error("Missing credentials")
            }

            // Add logic here to look up the user from the credentials supplied
            const res = await fetch(
               `${process.env.NEXT_PUBLIC_API_URL}api/auth/local/`,
               {
                  method: "POST",
                  body: JSON.stringify({
                     identifier: credentials.username,
                     password: credentials.password,
                  }),
                  headers: {
                     "Content-Type": "application/json",
                  },
               }
            )

            const data = await res.json()

            // return error if user there is any error :)
            if (!res.ok) {
               throw new Error(data.error.message || "An error occurred")
            }

            const user: User = {
               jwt: data.jwt,
               ...data.user,
            }

            // every thing is alright
            return user
         },
      }),
   ],
   pages: {
      signIn: "/auth/signin",
   },
   jwt: {
      maxAge: 7 * 24 * 60 * 60,
   },
   callbacks: {
      async jwt({ token, user, account, profile, isNewUser }) {
         if (user) {
            token.user = {
               email: user.email,
               createdAt: user.createdAt,
               id: user.id,
               updatedAt: user.updatedAt,
               blocked: user.blocked,
               provider: user.provider,
               confirmed: user.confirmed,
               image: user.image,
               username: user.username,
               jwt: user.jwt,
            }
         }

         return token
      },

      session: async ({ session, token }) => {
         if (token && session.user) {
            session.user = {
               email: token.user.email,
               createdAt: token.user.createdAt,
               id: token.user.id,
               updatedAt: token.user.updatedAt,
               blocked: token.user.blocked,
               provider: token.user.provider,
               confirmed: token.user.confirmed,
               image: token.user.image,
               username: token.user.username,
               jwt: token.user.jwt,
            }
         }

         return session
      },
   },
}

export default NextAuth(authOptions)
