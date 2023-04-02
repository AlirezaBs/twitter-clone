import { Comments } from "@/types/typings"
import Image from "next/image"
import React from "react"
import TimeAgo from "react-timeago"
import userPlaceholder from "../../public/man-placeholder.png"
import { useRouter } from "next/router"

interface Props {
   comment: Comments
}

export default function CommentsComponent({ comment }: Props) {
   const router = useRouter()
   
   return (
      <div key={comment.id} className="relative mb-5 flex space-x-2">
         <hr className="absolute left-5 top-10 h-[calc(100%-35px)] border-x border-twitter/20" />

         {!!comment.user.profileImage ? (
            <Image
               src={comment.user?.profileImage}
               alt={comment.user.username}
               quality={30}
               width={28}
               height={28}
               className="h-7 w-7 rounded-full object-cover cursor-pointer"
               onClick={() => router.push(`/user/${comment.user.id}`)}
            />
         ) : (
            <Image
               src={userPlaceholder}
               alt={comment.user.username}
               quality={30}
               width={28}
               height={28}
               className="h-7 w-7 rounded-full bg-transparent object-cover cursor-pointer"
               onClick={() => router.push(`/user/${comment.user.id}`)}
            />
         )}

         <div>
            <div className="flex items-center space-x-1">
               <p className="inline text-sm font-bold hover:cursor-pointer hover:focus:active:text-twitter" onClick={() => router.push(`/user/${comment.user.id}`)}>
                  @
                  {comment.user.username
                     .replace(/\s+/g, "")
                     .toLocaleLowerCase()}
               </p>
               <span>&#183;</span>
               <TimeAgo
                  className="text-sm text-gray-400"
                  date={comment.createdAt}
               />
            </div>

            <p className="pt-4 text-gray-700 dark:text-gray-200 whitespace-pre-line">
               {comment.comment}
            </p>
         </div>
      </div>
   )
}
