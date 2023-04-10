import { Tweet } from "@/types/typings"

export async function feedData() {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE_URL}api/tweet/feedData`
   )

   if (res.status === 500) throw new Error("Internal Server Error")
   else if (res.status !== 200) throw new Error("Fetching Error")

   const tweets: Tweet[] = await res.json()
   return tweets
}
