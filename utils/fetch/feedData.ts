import { Tweet } from "@/types/typings"

interface Props {
   start: number
   limit: number
}

export async function feedData({ start, limit }: Props) {
   const res = await fetch(
      `${process.env.NEXT_API_ROUTE_URL}/api/feedData?pagination[start]=${start}&pagination[limit]=${limit}`
   )

   if (res.status === 500) {
      throw new Error("Internal Server Error")
   } else if (res.status !== 200) throw new Error("Fetching Error")

   const tweets: Tweet[] = await res.json()
   return tweets
}
