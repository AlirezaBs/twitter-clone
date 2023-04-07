import React from "react"
import TimeAgo from "react-timeago"
import placeholder from "../../public/man-placeholder.png"
import { User } from "@/types/typings"
import ImageComponent from "../image"

interface Props {
   user: User
   goToUserProfile: Function
}

export default function UserRow({ user, goToUserProfile }: Props) {
   const userImageSrc = user?.profileImage ?? placeholder

   return (
      <div className="flex flex-row items-center space-x-3 rounded-lg px-2 py-3 hover:bg-gray-200 hover:dark:bg-gray-700">
         <div onClick={() => goToUserProfile(`/user/${user.id}`)}>
            <ImageComponent
               src={userImageSrc}
               alt={user.username}
               width={40}
               height={40}
               className="h-10 w-10 rounded-full border-2 border-gray-200 bg-transparent object-cover dark:border-gray-700"
            />
         </div>

         <div className="flex flex-1 flex-col justify-start">
            <p
               className="inline w-fit text-sm font-bold hover:cursor-pointer hover:text-twitter"
               onClick={() => goToUserProfile(`/user/${user.id}`)}
            >
               @{user.username.replace(/\s+/g, "").toLocaleLowerCase()}
            </p>
            <span className="text-sm text-gray-400">
               Joined <TimeAgo date={user.createdAt} />
            </span>
         </div>

         <button
            className="rounded-full bg-twitter py-1 px-3 text-white hover:bg-twitter/70"
            onClick={() => goToUserProfile(`/user/${user.id}`)}
         >
            view
         </button>
      </div>
   )
}
