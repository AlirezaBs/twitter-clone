import { User } from "@/types/typings"
import { parseUsersList } from "../parser/userParse"

export async function GetUsersList() {
  
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE_URL}api/user/userList`
   )

   if (res.status === 500) throw new Error("Internal Server Error")
   else if (res.status !== 200) throw new Error("Fetching Error")

   const users: User[] = await res.json()
   return users
}
