import qs from "qs"
import { User } from "@/types/typings"
import { parseUsers } from "../parser/userParse"

export async function singleUser(userId: string) {
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

   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/users/${userId}?${queryParams}`
   )

   if (!res.ok) {
      throw new Error("some error accured")
   }

   const data = await res.json()
   const user: User = parseUsers(data)

   return user
}