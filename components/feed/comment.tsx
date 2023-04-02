import { Comments } from "@/types/typings"
import React from "react"
import TimeAgo from "react-timeago"
import placeholder from "../../public/man-placeholder.png"
import { useRouter } from "next/router"
import ImageComponent from "../image"

interface Props {
   comment: Comments
}

export default function CommentsComponent({ comment }: Props) {
   const router = useRouter()
   const userImageSrc = comment?.user?.profileImage ?? placeholder

   return (
      <div key={comment.id} className="relative mb-5 flex space-x-2">
         <hr className="absolute left-5 top-10 h-[calc(100%-35px)] border-x border-twitter/20" />

         <div onClick={() => router.push(`/user/${comment.user.id}`)}>
            <ImageComponent
               src={userImageSrc}
               width={28}
               height={28}
               className="h-7 w-7 cursor-pointer rounded-full object-cover"
            />
         </div>

         <div>
            <div className="flex items-center space-x-1">
               <p
                  className="inline text-sm font-bold hover:cursor-pointer hover:text-twitter focus:text-twitter"
                  onClick={() => router.push(`/user/${comment.user.id}`)}
               >
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

            <p className="whitespace-pre-line pt-4 text-gray-700 dark:text-gray-200">
               {comment.comment}
            </p>
         </div>
      </div>
   )
}
