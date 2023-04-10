import { Tweet } from "@/types/typings"

export async function userTweets(userId: string) {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE_URL}api/user/userTweet/${userId}`
   )

   if (res.status === 500) throw new Error("Internal Server Error")
   else if (res.status !== 200) throw new Error("Fetching Error")

   const tweet: Tweet[] = await res.json()
   return tweet
}
