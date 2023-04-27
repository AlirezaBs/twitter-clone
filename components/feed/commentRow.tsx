import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import { useDispatch } from "react-redux"
import { startLoading, stopLoading } from "@/features/slices/loadingSlice"
import TimeAgo from "react-timeago"
import { HeartIcon } from "@heroicons/react/outline"
import { toast } from "react-hot-toast"

import placeholder from "../../public/man-placeholder.png"
import ImageComponent from "../image"
import { likeComment } from "@/utils/fetch/comment/likeComment"
import imageLoader from "@/utils/imageLoader"

import { Comments } from "@/types/typings"

interface Props {
   comment: Comments
}

export default function CommentsRow({ comment: commentProps }: Props) {
   const dispatch = useDispatch()
   const router = useRouter()
   const { data: session } = useSession()

   const [comment, setComment] = useState<Comments>(commentProps)
   const [isLiked, setIsLiked] = useState<boolean>(false)
   const [isLikeDisabled, setIsLIkeDisabled] = useState<boolean>(false)

   const userImageSrc = comment.user?.profileImage
      ? imageLoader(comment.user?.profileImage)
      : placeholder

   const goToUserProfile = (param: string) => {
      if (param === router.asPath) {
         dispatch(startLoading())
         dispatch(stopLoading())
      } else {
         dispatch(startLoading())
         router.push(param)
      }
   }

   const handleLike = async () => {
      setIsLIkeDisabled(true)

      try {
         if (!isLiked && !!session) {
            const likedIds = [
               ...comment.likes.map((like) => like.id),
               +session?.user.id,
            ]

            const res = await likeComment({
               commentId: comment.id,
               userId: likedIds,
               jwt: session.user.jwt,
            })

            setComment((prev) => {
               const updatedLikes = [...prev.likes, { id: session.user.id }]
               return { ...prev, likes: updatedLikes }
            })
         } else if (isLiked && !!session) {
            const likedIds = [...comment.likes.map((like) => like.id)]
            let updateLikedIds = likedIds.filter(
               (id) => +id !== +session.user.id
            )

            const res = await likeComment({
               commentId: comment.id,
               userId: updateLikedIds,
               jwt: session.user.jwt,
            })

            setComment((prev) => {
               const updatedLikes = prev.likes.filter(
                  (like) => +like.id !== +session.user.id
               )
               return { ...prev, likes: updatedLikes }
            })
         }
      } catch (error) {
         console.error("something went wrong!")
         toast.error("something went wrong!")
      }

      setIsLIkeDisabled(false)
   }

   useEffect(() => {
      const isUserLiked: boolean =
         !!session &&
         !!comment.likes.find((user) => +user.id === +session.user.id)

      setIsLiked(isUserLiked)
   }, [session, comment])

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

         <div className="w-full">
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

            <div className="mt-1 flex w-full flex-row items-center justify-between pt-4">
               <p className="whitespace-pre-line text-gray-700 dark:text-gray-200">
                  {comment.comment}
               </p>

               <button
                  onClick={handleLike}
                  disabled={isLikeDisabled}
                  className={`space-7-1 mt-1 flex cursor-pointer flex-col items-center text-gray-400 transition duration-100 disabled:scale-90 ${
                     isLiked && "text-rose-400 dark:text-rose-600"
                  }`}
               >
                  <HeartIcon
                     className={`h-4 w-4 transition duration-100 ${
                        isLiked &&
                        "fill-rose-400 text-rose-500 dark:fill-rose-600 dark:text-rose-800"
                     }`}
                  />
                  <p className="text-sm">{comment.likes?.length || "0"}</p>
               </button>
            </div>
         </div>
      </div>
   )
}
