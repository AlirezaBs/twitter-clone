import React, { useEffect, useState, memo } from "react"
import { SearchIcon } from "@heroicons/react/outline"
import { GetUsersList } from "@/utils/fetch/usersList"
import { User } from "@/types/typings"
import UserSkeleton from "../skeleton/userSkeleton"
import UserRow from "./userRow"

function Widegts() {
   const [users, setUsers] = useState<User[]>([])
   const [loading, setLoading] = useState<Boolean>(true)

   console.log(users)

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
      <div className="hide-scrollbar col-span-3 mt-2 hidden flex-col space-y-2 px-2 lg:flex">
         <div className="my-2 flex items-center space-x-1 rounded-full bg-gray-100 p-3 text-gray-400 transition dark:bg-gray-600 dark:text-gray-200">
            <SearchIcon className="h-5 w-5" />
            <input
               type="text"
               placeholder="Search Twitter"
               className="flex-1 break-words bg-transparent outline-none"
            />
         </div>

         <div className="flex flex-col space-y-4 transition bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            <h1 className="font-semibold text-xl">Who Joined Twitter<small>2</small></h1>
            {!!loading ? (
               <>
                  {Array.from(Array(8)).map(() => (
                     <>
                        <UserSkeleton />
                     </>
                  ))}
               </>
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
