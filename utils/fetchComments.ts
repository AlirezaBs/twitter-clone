import { Comments } from "./../typings.d"

export const fetchComments = async (tweetId: string) => {
   const res = await fetch(`/api/getComments?tweetId=${tweetId}`)

   if (res.status !== 200) {
      console.log("can't fetch data")
      return
   }

   const comments: Comments[] = await res.json()

   return comments
}
