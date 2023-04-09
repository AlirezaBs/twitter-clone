import { NextApiRequest, NextApiResponse } from "next"
import { User } from "@/types/typings"
import qs from "qs"
import { parseUsers } from "@/utils/parser/userParse"

const queryParams = qs.stringify(
   {
      populate: {
         profileImage: {
            fields: ["url"],
         },
      },
   },
   {
      encodeValuesOnly: true, // prettify URL
   }
)

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<User | { message: string }>
) {
   const { slug } = req.query

   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}api/users/${slug}?${queryParams}`
      )

      const data = await response.json()
      const user: User = parseUsers(data)

      res.status(200).json(user)
   } catch (error) {
      res.status(500).json({ message: "Internal server error" })
   }
}
