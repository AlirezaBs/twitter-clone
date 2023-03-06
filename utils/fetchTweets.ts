import { Tweet } from "@/typings"

export const fetchTweets = async () => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`)

   if (res.status !== 200) {
    console.log("can't fetch data")
    return
   }

   const data = await res.json()
   const tweets: Tweet[] = data.tweets

   return tweets
}
