import React, { useState } from "react"
import Image from "next/image"
import placeholder from "../../public/man-placeholder.png"
import { User } from "@/types/typings"
import ReactTimeago from "react-timeago"
import ImageComponent from "../image"

interface Props {
   user: User
}

export default function UserBox({ user }: Props) {
   const userImageSrc = user?.profileImage ?? placeholder

   return (
      <div className="relative flex flex-row items-start space-x-3 border-x border-b border-gray-200 p-5 dark:border-gray-700 ">
         <ImageComponent
            src={userImageSrc as string}
            width={56}
            height={54}
            className="h-20 w-20 rounded-full"
         />

         <div className="flex flex-1 flex-col items-start justify-between space-y-2">
            <p className="inline text-sm font-bold hover:cursor-pointer">
               {user.username}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300">
               {user.about ? user.about : "About me ..."}
            </p>

            <div className="flex flex-row space-x-3">
               <span className="text-xs text-gray-400">
                  {/* {profile?.connection || 0} Connetction */}
                  0 Connections
               </span>

               <span className="text-xs text-gray-400">
                  Joined <ReactTimeago date={user.createdAt} />
               </span>
            </div>
         </div>
      </div>
   )
}
