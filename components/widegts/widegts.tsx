import React, { useEffect, useState, memo, useRef } from "react"
import { useRouter } from "next/router"

import { useDispatch } from "react-redux"
import { startLoading, stopLoading } from "@/features/slices/loadingSlice"
import { SearchIcon } from "@heroicons/react/outline"

import { GetUsersList } from "@/utils/fetch/usersList"
import UserSkeleton from "../skeleton/userSkeleton"
import UserRow from "./userRow"

import { User } from "@/types/typings"

function Widegts() {
   const dispatch = useDispatch()
   const router = useRouter()
   
   const [users, setUsers] = useState<User[]>([])
   const [loading, setLoading] = useState<Boolean>(true)

   const goToUserProfile = (param: string) => {
      if (param === router.asPath) {
         dispatch(startLoading())
         dispatch(stopLoading())
      } else {
         dispatch(startLoading())
         router.push(param)
      }
   }

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
      <>
         <div className="hide-scrollbar lw-screen-100 col-span-3 mt-2 hidden flex-col space-y-2 overflow-y-auto px-2 lg:flex">
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
                  <div className="flex flex-col space-y-4">
                     {Array.from(Array(5)).map(() => (
                        <>
                           <UserSkeleton />
                        </>
                     ))}
                  </div>
               ) : (
                  <>
                     {users.map((user) => (
                        <UserRow
                           key={user.id}
                           user={user}
                           goToUserProfile={goToUserProfile}
                        />
                     ))}
                  </>
               )}
            </div>
         </div>
      </>
   )
}

export default memo(Widegts)
