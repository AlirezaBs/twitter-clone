import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { startLoading, stopLoading } from "@/features/slices/loadingSlice"
import {
   ChatAlt2Icon,
   HeartIcon,
   SwitchHorizontalIcon,
   UploadIcon,
} from "@heroicons/react/outline"
import TimeAgo from "react-timeago"
import { useSession } from "next-auth/react"

import Comment from "./comment"
import placeholder from "../../public/man-placeholder.png"
import ImageComponent from "../image"

import { Comments, Tweet } from "@/types/typings"

interface Props {
   tweet: Tweet
}

export default function TweetComponent({ tweet: tweetProps }: Props) {
   const dispatch = useDispatch()
   const router = useRouter()
   const { data: session } = useSession()

   const [tweet, setTweet] = useState<Tweet>(tweetProps)
   const [showCommets, setShowComments] = useState<boolean>(false)
   const [isLiked, setIsLiked] = useState<boolean>(false)

   const userImageSrc = tweet?.user?.profileImage ?? placeholder

   console.log(tweet.likes, session?.user.username)

   const goToUserProfile = (param: string) => {
      if (param === router.asPath) {
         dispatch(startLoading())
         dispatch(stopLoading())
      } else {
         dispatch(startLoading())
         router.push(param)
      }
   }

   const addComment = (newComment: Comments) => {
      setTweet((tweet) => {
         return {
            ...tweet,
            comments: [newComment, ...(tweet.comments as Comments[])],
         }
      })
   }

   useEffect(() => {
      const isUserLiked: boolean = !!session
         ? !!tweet.likes.find((user) => user.username === session.user.username)
         : false

      setIsLiked(isUserLiked)
   }, [session, tweet.likes])

   return (
      <div className="space-x-3p-4 flex flex-col rounded-lg border border-gray-200 p-3 hover:bg-gray-100 dark:border-gray-700 hover:dark:bg-gray-800  md:p-5">
         <div className="flex space-x-3">
            <div
               className="h-fit w-fit"
               onClick={() => goToUserProfile(`/user/${tweet.user.id}`)}
            >
               <ImageComponent
                  src={userImageSrc}
                  width={40}
                  height={40}
                  className="h-10 w-10 cursor-pointer rounded-full border-2 border-gray-200 object-cover dark:border-gray-700"
               />
            </div>

            <div className="flex-1">
               <div className="flex items-center space-x-1">
                  <p
                     className="text-sm font-bold hover:cursor-pointer hover:text-twitter focus:text-twitter"
                     onClick={() => goToUserProfile(`/user/${tweet.user.id}`)}
                  >
                     @
                     {tweet.user.username
                        .replace(/\s+/g, "")
                        .toLocaleLowerCase()}
                  </p>
                  <span>&#183;</span>
                  <TimeAgo
                     className="text-sm text-gray-400"
                     date={tweet.createdAt}
                  />
               </div>

               <p className="whitespace-pre-line pt-2">{tweet.text}</p>

               {tweet.image && (
                  <div className="relative m-5 ml-0 mb-1 max-h-64 w-full overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600">
                     <ImageComponent
                        src={tweet?.image}
                        alt=""
                        width={30}
                        height={30}
                        className="transition-transform duration-500 hover:scale-105 active:focus:scale-105"
                        layout="responsive"
                     />
                  </div>
               )}
            </div>
         </div>

         <div className="mt-5 flex justify-between">
            <div
               onClick={() => setShowComments(!showCommets)}
               className={`duration-125 flex cursor-pointer items-center space-x-1 text-gray-400 transition-transform hover:scale-110 ${
                  showCommets && "scale-110 text-gray-800 dark:text-gray-100"
               }`}
            >
               <ChatAlt2Icon className="h-5 w-5" />
               <p>{tweet.comments?.length || "+"}</p>
            </div>

            <div className="duration-125 flex cursor-pointer items-center space-x-3 text-gray-400 transition-transform hover:scale-110">
               <SwitchHorizontalIcon className="h-5 w-5" />
            </div>

            <div
               className={`flex cursor-pointer items-center space-x-1 text-gray-400 ${
                  isLiked && "text-rose-400 dark:text-rose-600"
               }`}
            >
               <HeartIcon
                  className={`h-5 w-5 transition-transform ${
                     isLiked &&
                     "scale-105 fill-rose-400 text-rose-500 dark:fill-rose-600 dark:text-rose-800"
                  }`}
               />
               <p>{tweet.likes?.length || "0"}</p>
            </div>

            <div className="duration-125 flex cursor-pointer items-center space-x-3 text-gray-400 transition-transform hover:scale-110">
               <UploadIcon className="h-5 w-5" />
            </div>
         </div>

         {showCommets && <Comment tweet={tweet} addComment={addComment} />}
      </div>
   )
}
