import { User } from "@/types/typings"
import qs from "qs"
import { parseUsersList } from "../parser/userParse"

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

export async function GetUsersList() {
    const res = await fetch(
       `${process.env.NEXT_PUBLIC_API_URL}api/users?${queryParams}`
    )
 
    if (!res.ok) {
       throw new Error("some error accured")
    }
 
    const data = await res.json()
    const users: User[] = parseUsersList(data)
 
    return users
 }
 