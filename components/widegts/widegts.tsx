import React, { useEffect, useState, memo } from "react"
import { SearchIcon } from "@heroicons/react/outline"
import { GetUsersList } from "@/utils/fetch/usersList"
import { User } from "@/types/typings"
import UserSkeleton from "../skeleton/userSkeleton"
import UserRow from "./userRow"

function Widegts() {
   const [users, setUsers] = useState<User[]>([])
   const [loading, setLoading] = useState<Boolean>(true)

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const res = await GetUsersList()
            setUsers(res)
            setLoading(false)
         } catch (error) {
            console.log("error accured")
         }
      }

      fetchUsers()
   }, [])

   return (
      <div className="hide-scrollbar dw-screen-100 overflow-y-auto col-span-3 mt-2 hidden flex-col space-y-2 px-2 lg:flex">
         <div className="my-2 flex items-center space-x-1 rounded-full bg-gray-100 p-3 text-gray-400 dark:bg-gray-600 dark:text-gray-200">
            <SearchIcon className="h-5 w-5" />
            <input
               type="text"
               placeholder="Search TweetHub"
               className="flex-1 break-words bg-transparent outline-none"
            />
         </div>

         <div className="flex flex-col overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            <h1 className="py-3 pl-3 text-xl font-semibold">
               Who Joined tweethub
            </h1>
            {!!loading ? (
               <div className="flex flex-col space-y-2">
                  {Array.from(Array(5)).map(() => (
                     <>
                        <UserSkeleton />
                     </>
                  ))}
               </div>
            ) : (
               <>
                  {users.map((user) => (
                     <UserRow key={user.id} user={user} />
                  ))}
               </>
            )}
         </div>
      </div>
   )
}

export default memo(Widegts)
