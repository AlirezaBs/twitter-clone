import React, { useRef } from "react"
import { useRouter } from "next/router"

import { useDispatch } from "react-redux"
import { startLoading, stopLoading } from "@/features/slices/loadingSlice"
import TimeAgo from "react-timeago"

import placeholder from "../../public/man-placeholder.png"
import ImageComponent from "../image"

import { Comments } from "@/types/typings"

interface Props {
   comment: Comments
}

export default function CommentsComponent({ comment }: Props) {
   const dispatch = useDispatch()
   const router = useRouter()
   const userImageSrc = comment?.user?.profileImage ?? placeholder

   const goToUserProfile = (param: string) => {
      if (param === router.asPath) {
         dispatch(startLoading())
         dispatch(stopLoading())
      } else {
         dispatch(startLoading())
         router.push(param)
      }
   }

   return (
      <div key={comment.id} className="relative mb-5 flex space-x-2">
         <hr className="absolute left-5 top-10 h-[calc(100%-35px)] border-x border-twitter/20" />

         <div
            className="h-fit w-fit"
            onClick={() => goToUserProfile(`/user/${comment.user.id}`)}
         >
            <ImageComponent
               src={userImageSrc}
               width={28}
               height={28}
               className="h-7 w-7 cursor-pointer rounded-full border-2 border-gray-200 object-cover dark:border-gray-700"
            />
         </div>

         <div>
            <div className="flex items-center space-x-1">
               <p
                  className="inline text-sm font-bold hover:cursor-pointer hover:text-twitter focus:text-twitter"
                  onClick={() => goToUserProfile(`/user/${comment.user.id}`)}
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
