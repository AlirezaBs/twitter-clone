import NextAuth from "next-auth/next"
import TwiiterProvider from "next-auth/providers/twitter"

export default NextAuth({
   providers: [
      TwiiterProvider({
         clientId: process.env.TWITTER_CLIENT_ID,
         clientSecret: process.env.TWITTER_CLIENT_SECRET,
         version: "2.0",
      }),
      // add more providers here ...
   ],
})
