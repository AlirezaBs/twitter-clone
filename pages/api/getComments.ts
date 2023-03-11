import { sanityClient } from "@/sanity"
import { Comments } from "@/typings"
import type { NextApiRequest, NextApiResponse } from "next"
import { groq } from "next-sanity"

const commentQuery = groq`
  *[_type == "comment" && references(*[_type == 'tweet' && _id == $tweetId ]._id)] {
    _id,
    ...
  } | order(createdAt desc)
`

type Data = Comments[]

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   const { tweetId } = req.query

   try {
      const comments: Comments[] = await sanityClient.fetch(commentQuery, {
         tweetId,
      })

      res.json(comments)
   } catch (error: any) {
      if (error.response && error.response.status === 403) {
         res.status(403).end({ error: "Forbidden" })
      } else {
         // Handle other errors
         res.status(500).end({ error: "Internal Server Error" })
      }
   }
}
