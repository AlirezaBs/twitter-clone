import { Tweet } from "@/types/typings"
import qs from "qs"
import { parseTweetData } from "../parser/feedDataParse"

const queryParams = qs.stringify(
   {
      sort: ["createdAt:desc"],
      fields: ["text", "blockTweet", "likes", "createdAt", "updatedAt"],
      populate: {
         image: {
            fields: ["url"],
         },
         user: {
            fields: ["username", "blocked"],
            populate: {
               profileImage: {
                  fields: ["url"],
               },
            },
         },
         comments: {
            sort: ["createdAt:desc"],
            fields: [
               "comment",
               "blockComment",
               "likes",
               "createdAt",
               "updatedAt",
            ],
            populate: {
               user: {
                  fields: ["username", "blocked"],
                  populate: {
                     profileImage: {
                        fields: ["url"],
                     },
                  },
               },
            },
         },
      },
   },
   {
      encodeValuesOnly: true, // prettify URL
   }
)

export async function feedData() {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/tweets?${queryParams}`
   )

   if (!res.ok) {
      throw new Error("some error accured")
   }

   const data = await res.json()
   const tweets: Tweet[] = parseTweetData(data.data)

   return tweets
}