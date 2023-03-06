import { Comments } from "@/typings"
import Image from "next/image"
import React from "react"
import TimeAgo from "react-timeago"

interface Props {
   comments: Comments[]
}

export default function CommentsComponent({ comments }: Props) {
   return (
      <div>
         {comments.map((comment) => (
            <div key={comment._id} className="relative mb-5 flex space-x-2">
               <hr className="absolute left-5 top-10 h-[calc(100%-35px)] border-x border-twitter/20" />

               <Image
                  src={comment.profileImg}
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full object-cover"
               />
               <div>
                  <div className="flex items-center space-x-1">
                     <p className="mr-1 font-bold">{comment.username}</p>
                     <p className="hidden text-sm text-gray-500 sm:inline">
                        @
                        {comment.username
                           .replace(/\s+/g, "")
                           .toLocaleLowerCase()}
                     </p>
                     <span>&#183;</span>
                     <TimeAgo
                        className="text-sm text-gray-400"
                        date={comment._createdAt}
                     />
                  </div>

                  <p className="pt-4 text-gray-700">{comment.comment}</p>
               </div>
            </div>
         ))}
      </div>
   )
}
