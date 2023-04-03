import React, { useRef } from "react"
import Image from "next/image"
import { User } from "@/types/typings"
import userPlaceholder from "../../public/man-placeholder.png"
import TimeAgo from "react-timeago"
import { useRouter } from "next/router"
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar"

interface Props {
   user: User
}

export default function UserRow({ user }: Props) {
   const ref = useRef<LoadingBarRef>(null)
   const router = useRouter()

   const goToUserProfile = (param: string) => {
      ref.current?.continuousStart()
      router.push(param)

      setTimeout(() => {
         ref.current?.complete()
      }, 500)
   }

   return (
      <>
         <LoadingBar color="#00aded" ref={ref} shadow={true} />

         <div className="flex flex-row items-center space-x-3 rounded-lg px-2 py-3 hover:bg-gray-200 hover:dark:bg-gray-700">
            <div onClick={() => goToUserProfile(`/user/${user.id}`)}>
               {!!user?.profileImage ? (
                  <Image
                     src={user.profileImage}
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
      </>
   )
}
