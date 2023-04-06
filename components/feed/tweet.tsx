import React, { useRef, useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import { toast } from "react-hot-toast"
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar"
import {
   ChatAlt2Icon,
   HeartIcon,
   SwitchHorizontalIcon,
   UploadIcon,
} from "@heroicons/react/outline"
import TimeAgo from "react-timeago"

import CommentsComponent from "./comment"
import placeholder from "../../public/man-placeholder.png"
import { postComments } from "@/utils/fetch/postComment"
import ImageComponent from "../image"

import { Comments, Tweet } from "@/types/typings"

interface Props {
   tweet: Tweet
   addComment: Function
}

export default function TweetComponent({ tweet, addComment }: Props) {
   const barRef = useRef<LoadingBarRef>(null)
   const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false)
   const [showCommets, setShowComments] = useState<boolean>(false)
   const [commentText, setCommentText] = useState<string>("")

   const { data: session } = useSession()
   const router = useRouter()
   
   const userImageSrc = tweet?.user?.profileImage ?? placeholder

   const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      barRef.current?.continuousStart()
      e.preventDefault()
      setIsDisabledButton(true)

      try {
         if (!session?.user?.id || !session?.user?.jwt) {
            throw new Error("User ID is undefined")
         }

         const res = await postComments({
            user: +session.user.id,
            comment: commentText,
            tweet: +tweet.id,
            jwt: session.user.jwt,
         })

         // get data and add to tweet list
         const id = res.data.id
         const { blockComment, createdAt, likes, comment, updatedAt } =
            res.data.attributes
         const newComment: Comments = {
            id,
            blockComment,
            createdAt,
            likes,
            comment,
            updatedAt,
            user: {
               id: session.user.id,
               username: session.user.username,
               blocked: session.user.blocked,
               profileImage: session.user?.image,
            },
         }

         addComment(newComment, tweet.id)
         barRef.current?.complete()
         setCommentText("")
         setIsDisabledButton(false)
         toast.success("submitted successfully!")
      } catch (error) {
         barRef.current?.complete()
         setIsDisabledButton(false)
         toast.error("something went wrong")
      }
   }

   const goToUserProfile = (param: string) => {
      barRef.current?.continuousStart()
      router.push(param)

      setTimeout(() => {
         barRef.current?.complete()
      }, 1100)
   }

   return (
      <div className="space-x-3p-4 flex flex-col rounded-lg border border-gray-200 p-3 hover:bg-gray-100 dark:border-gray-700 hover:dark:bg-gray-800  md:p-5">
         <LoadingBar className="z-50" color="#00aded" ref={barRef} />

         <div className="flex space-x-3">
            <div className="h-fit w-fit" onClick={() => goToUserProfile(`/user/${tweet.user.id}`)}>
               <ImageComponent
                  src={userImageSrc}
                  width={40}
                  height={40}
                  className="h-10 w-10 cursor-pointer rounded-full object-cover"
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

            <div className="duration-125 flex cursor-pointer items-center space-x-3 text-gray-400 transition-transform hover:scale-110 hover:text-red-300">
               <HeartIcon className="h-5 w-5" />
            </div>

            <div className="duration-125 flex cursor-pointer items-center space-x-3 text-gray-400 transition-transform hover:scale-110">
               <UploadIcon className="h-5 w-5" />
            </div>
         </div>

         {showCommets && (
            <div className="hide-scrollbar my-2 mt-5 max-h-80 space-y-5 overflow-y-scroll border-t border-gray-300 p-3 py-0 dark:border-gray-500">
               <form onSubmit={handleCommentSubmit} className="flex pt-5">
                  <input
                     className=" flex-1 bg-transparent text-gray-500 outline-none placeholder:text-gray-400 dark:text-gray-300"
                     type="text"
                     placeholder="Your comment here"
                     value={commentText}
                     onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                     disabled={!session || !commentText || isDisabledButton}
                     className="rounded-full bg-twitter px-2 pt-3 pb-2 text-sm leading-3 text-white hover:bg-twitter/80 focus:active:bg-twitter/80 disabled:opacity-40"
                     type="submit"
                  >
                     Comment
                  </button>
               </form>
               {(tweet?.comments?.length || 0) > 0 && (
                  <div className="border-t border-gray-300 pt-4 dark:border-gray-500">
                     {tweet?.comments &&
                        tweet.comments.map((comment) => (
                           <CommentsComponent
                              key={comment.id}
                              comment={comment}
                           />
                        ))}
                  </div>
               )}
            </div>
         )}
      </div>
   )
}
