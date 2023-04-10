import { NextApiRequest, NextApiResponse } from "next"
import { Tweet } from "@/types/typings"
import qs from "qs"
import { parseTweetData } from "@/utils/parser/feedDataParse"

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Tweet[] | { message: string }>
) {
   const { slug } = req.query

   const queryParams = qs.stringify(
      {
         filters: {
            user: {
               id: {
                  $eq: Number(slug),
               },
            },
         },
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

   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}api/tweets?${queryParams}`
      )

      const data = await response.json()
      const tweet: Tweet[] = parseTweetData(data.data)

      res.status(200).json(tweet)
   } catch (error) {
      res.status(500).json({ message: "Internal server error" })
   }
}
