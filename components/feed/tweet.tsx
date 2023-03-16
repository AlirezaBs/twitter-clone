import { Comments, Tweet } from "@/typings"
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

interface Props {
   tweet: Tweet
}

export default function TweetComponent({ tweet }: Props) {
   const [showCommets, setShowComments] = useState<boolean>(false)

   const tweetImgLoader = ({}) => {
      return `${process.env.NEXT_PUBLIC_API_URL_IMG}${tweet.image}`
   }
   const tweetUserLoader = ({}) => {
      return `${process.env.NEXT_PUBLIC_API_URL_IMG}${tweet.user.profileImage}`
   }

   return (
      <div className="flex flex-col space-x-3 border-y border-t-0 border-gray-100 p-5 dark:border-gray-500">
         <div className="flex space-x-3">
            <Image
               loader={tweetUserLoader}
               src={tweet.user?.profileImage}
               alt={tweet.user.username}
               quality={30}
               width={40}
               height={40}
               className="h-10 w-10 rounded-full object-cover"
            />

            <div className="flex-1">
               <div className="flex items-center space-x-1">
                  <p className="text-sm font-bold">
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
                  <div className="relative m-5 ml-0 mb-1 w-full overflow-hidden shadow-sm rounded-lg">
                     <Image
                        loader={tweetImgLoader}
                        src={tweet?.image}
                        alt=""
                        quality={70}
                        width={30}
                        height={30}
                        layout="responsive"
                        className="hover:scale-110 transition duration-500"
                     />
                  </div>
               )}
            </div>
         </div>

         <div className="mt-5 flex justify-between">
            <div
               onClick={() => setShowComments(!showCommets)}
               className={`duration-125 flex cursor-pointer items-center space-x-3 text-gray-400 transition-all hover:scale-110 ${
                  showCommets && "scale-110 text-gray-800 dark:text-gray-100"
               }`}
            >
               <ChatAlt2Icon className="h-5 w-5" />
               <p>{tweet.comments?.length || 0}</p>
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

         {showCommets && (tweet?.comments?.length || 0) > 0 && (
            <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
               {tweet?.comments && tweet.comments.map((comment) => (
                  <CommentsComponent key={comment.id} comment={comment} />
               ))}
            </div>
         )}
      </div>
   )
}
