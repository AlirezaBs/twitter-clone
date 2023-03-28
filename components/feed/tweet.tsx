import { Comments, Tweet } from "@/types/typings"
import {
   ChatAlt2Icon,
   HeartIcon,
   SwitchHorizontalIcon,
   UploadIcon,
} from "@heroicons/react/outline"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import TimeAgo from "react-timeago"
import CommentsComponent from "./comment"
import userPlaceholder from "../../public/man-placeholder.png"
import { useSession } from "next-auth/react"
import { toast } from "react-hot-toast"
import { postComments } from "@/utils/fetch/postComment"
import imageLoader from "@/utils/imageLoader"

interface Props {
   tweet: Tweet
   addComment: Function
}

export default function TweetComponent({ tweet, addComment }: Props) {
   const [showCommets, setShowComments] = useState<boolean>(false)
   const [commentText, setCommentText] = useState<string>("")
   const { data: session } = useSession()

   const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

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
         setCommentText("")
         toast.success("submitted successfully!")
      } catch (error) {
         toast.error("something went wrong")
      }
   }

   return (
      <div className="flex flex-col space-x-3 border-y border-t-0 border-gray-400 p-4 transition dark:border-gray-500  md:p-5">
         <div className="flex space-x-3">
            {!!tweet.user.profileImage ? (
               <Image
                  loader={() => imageLoader(tweet.user?.profileImage as string)}
                  src={tweet.user?.profileImage}
                  alt={tweet.user.username}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
               />
            ) : (
               <Image
                  src={userPlaceholder}
                  alt={tweet.user.username}
                  quality={30}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full bg-transparent object-cover"
               />
            )}

            <div className="flex-1">
               <div className="flex items-center space-x-1">
                  <p className="text-sm font-bold hover:cursor-pointer hover:text-twitter">
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

               <p className="pt-1">{tweet.text}</p>

               {tweet.image && (
                  <div className="relative m-5 ml-0 mb-1 w-full overflow-hidden rounded-lg shadow-sm">
                     <Image
                        loader={() => imageLoader(tweet.image as string)}
                        src={tweet?.image}
                        alt=""
                        quality={70}
                        width={30}
                        height={30}
                        layout="responsive"
                        className="transition duration-500 hover:scale-110"
                     />
                  </div>
               )}
            </div>
         </div>

         <div className="mt-5 flex justify-between">
            <div
               onClick={() => setShowComments(!showCommets)}
               className={`duration-125 flex cursor-pointer items-center space-x-1 text-gray-400 transition-all hover:scale-110 ${
                  showCommets && "scale-110 text-gray-800 dark:text-gray-100"
               }`}
            >
               <ChatAlt2Icon className="h-5 w-5" />
               <p>{tweet.comments?.length || "+"}</p>
            </div>

            <div className="duration-125 flex cursor-pointer items-center space-x-3 text-gray-400 transition-all hover:scale-110">
               <SwitchHorizontalIcon className="h-5 w-5" />
            </div>

            <div className="duration-125 flex cursor-pointer items-center space-x-3 text-gray-400 transition-all hover:scale-110 hover:text-red-300">
               <HeartIcon className="h-5 w-5" />
            </div>

            <div className="duration-125 flex cursor-pointer items-center space-x-3 text-gray-400 transition-all hover:scale-110">
               <UploadIcon className="h-5 w-5" />
            </div>
         </div>

         {showCommets && (
            <div className="hide-scrollbar my-2 mt-5 max-h-80 space-y-5 overflow-y-scroll border-t border-gray-300 p-3 py-0 transition dark:border-gray-500">
               <form onSubmit={handleCommentSubmit} className="flex pt-5">
                  <input
                     className=" flex-1 bg-transparent text-gray-500 outline-none transition placeholder:text-gray-400 dark:text-gray-300"
                     type="text"
                     placeholder="Your comment here"
                     value={commentText}
                     onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                     disabled={!session || !commentText}
                     className="rounded-full bg-twitter px-2 py-3 text-sm leading-3 text-white hover:bg-twitter/80 disabled:opacity-40"
                     type="submit"
                  >
                     Comment
                  </button>
               </form>
               {(tweet?.comments?.length || 0) > 0 && (
                  <div className="border-t border-gray-300 pt-4 transition dark:border-gray-500">
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
