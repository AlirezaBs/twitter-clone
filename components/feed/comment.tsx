import { Comments } from "@/typings"
import Image from "next/image"
import React from "react"
import TimeAgo from "react-timeago"

interface Props {
   comment: Comments
}

export default function CommentsComponent({ comment }: Props) {
   const commentUserLoader = ({}) => {
      return `${process.env.NEXT_PUBLIC_API_URL_IMG}${comment.user.profileImage}`
   }

   return (
      <div key={comment.id} className="relative mb-5 flex space-x-2">
         <hr className="absolute left-5 top-10 h-[calc(100%-35px)] border-x border-twitter/20" />

         <Image
            loader={commentUserLoader}
            src={comment.user?.profileImage}
            alt={comment.user.username}
            quality={30}
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover"
         />
         <div>
            <div className="flex items-center space-x-1">
               <p className="mr-1 font-bold">{comment.user.username}</p>
               <p className="hidden text-sm text-gray-500 sm:inline">
                  @{comment.user.username.replace(/\s+/g, "").toLocaleLowerCase()}
               </p>
               <span>&#183;</span>
               <TimeAgo
                  className="text-sm text-gray-400"
                  date={comment.createdAt}
               />
            </div>

            <p className="pt-4 text-gray-700 transition dark:text-gray-200">
               {comment.comment}
            </p>
         </div>
      </div>
   )
}
