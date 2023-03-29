import React from "react"
import Image from "next/image"
import { User } from "@/types/typings"
import userPlaceholder from "../../public/man-placeholder.png"
import imageLoader from "@/utils/imageLoader"
import TimeAgo from "react-timeago"
import { useRouter } from "next/router"

interface Props {
   user: User
}

export default function UserRow({ user }: Props) {
   const router = useRouter()
   
   return (
      <div className="flex flex-row items-center space-x-3 px-2 py-3 rounded-lg hover:bg-gray-200 hover:dark:bg-gray-700">
         {!!user.profileImage ? (
            <Image
               loader={() => imageLoader(user.profileImage?.url as string)}
               src={user.profileImage.url}
               alt={user.username}
               width={40}
               height={40}
               className="h-10 w-10 rounded-full object-cover"
            />
         ) : (
            <Image
               src={userPlaceholder}
               alt={user.username}
               width={40}
               height={40}
               className="h-10 w-10 rounded-full bg-transparent object-cover"
            />
         )}

         <div className="flex flex-1 flex-col justify-start">
            <p className="inline w-fit text-sm font-bold hover:cursor-pointer hover:text-twitter">
               @{user.username.replace(/\s+/g, "").toLocaleLowerCase()}
            </p>
            <span className="text-sm text-gray-400">
               Joined{" "}
               <TimeAgo date={user.createdAt} />
            </span>
         </div>

         <button className="py-1 rounded-full px-3 bg-twitter hover:bg-twitter/70 text-white" onClick={() => router.push(`/user/${user.id}`)}>view</button>
      </div>
   )
}
