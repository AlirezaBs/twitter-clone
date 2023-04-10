import { NextApiRequest, NextApiResponse } from "next"
import { Tweet } from "@/types/typings"
import qs from "qs"
import { parseTweetData } from "@/utils/parser/feedDataParse"

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
      encodeValuesOnly: true, // prettify URL/*  */
   }
)

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Tweet[] | { message: string }>
) {
   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}api/tweets?${queryParams}`
      )

      const data = await response.json()
      const tweets: Tweet[] = parseTweetData(data.data)

      res.status(200).json(tweets)
   } catch (error) {
      res.status(500).json({ message: "Internal server error" })
   }
}
