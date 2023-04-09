import { NextApiRequest, NextApiResponse } from "next"
import { User } from "@/types/typings"
import qs from "qs"
import { parseUsersList } from "@/utils/parser/userParse"

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<User[] | { message: string }>
) {
   const queryParams = qs.stringify(
      {
         sort: ["updatedAt:desc"],
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

   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}api/users?${queryParams}`
      )

      const data = await response.json()
      const user: User[] = parseUsersList(data)

      res.status(200).json(user)
   } catch (error) {
      res.status(500).json({ message: "Internal server error" })
   }
}
