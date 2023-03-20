import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

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

            // every thing is alright
            return {
               jwt: data.jwt,
               ...data.user,
            }
         },
      }),
   ],
   pages: {
      signIn: "/auth/signin",
   },
   callbacks: {
      // Getting the JWT token from API response
      jwt: async ({token, user, account}) => {        
         if (user) {
           token.id = user.id;
           token.jwt = user.jwt;
         }
         return Promise.resolve(token);
      },
    
      session: async ({ session, token }) => {
         if (session.user){
            session.user.jwt = token.jwt as string;
            session.user.id = token.id as number;
         }
         return Promise.resolve(session);
       },
    }
}

export default NextAuth(authOptions)
