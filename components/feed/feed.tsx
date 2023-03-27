import { RefreshIcon } from "@heroicons/react/outline"
import React, { useEffect, useState } from "react"
import TweetBox from "./tweetBox"
import { Comments, Tweet } from "@/types/typings"
import toast from "react-hot-toast"
import TweetComponent from "./tweet"
import { feedData } from "@/utils/fetch/feedData"
import TweetSkeleton from "../skeleton/tweetSkeleton"
import TweetNonImageSkeleton from "../skeleton/tweetNonImageSkeleton"
import { useSession } from "next-auth/react"

interface Props {
   tweets: Tweet[]
}

export default function Feed({ tweets: tweetsProp }: Props) {
   const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
   const [loading, setLoading] = useState<boolean>(true)
   const { data: session } = useSession()

   const handleRefresh = async () => {
      setLoading(true)
      const tweets = await feedData()
      if (tweets) {
         setTweets(tweets)
         toast.success("Feed updated!")
      } else {
         toast.error("Can't update now!")
      }
   }

   const addToList = (newTweet: Tweet) => {
      setTweets((tweets) => [newTweet, ...tweets])
   }

   const addComment = (newComment: Comments, tweetId: string) => {
      setTweets((prevTweets) =>
         prevTweets.map((tweet) =>
            tweet.id === tweetId
               ? {
                    ...tweet,
                    comments: [
                       newComment,
                       ...(tweet.comments || []),
                    ] as Comments[],
                 }
               : tweet
         )
      )
   }

   useEffect(() => {
      if (tweets) {
         setLoading(false)
      }
   }, [tweetsProp, tweets])

   return (
      <div className="col-span-8 h-screen overflow-scroll border-x-2 border-gray-400 pb-20 transition dark:border-gray-500 md:col-span-7 lg:col-span-5">
         <div className="my-5 flex items-center justify-between">
            {!!session ? (
               <h1 className="pl-5 pb-0 text-xl font-bold">
                  Hello {session.user.username}
               </h1>
            ) : (
               <h1 className="pl-5 pb-0 text-xl font-bold">Home</h1>
            )}
            <RefreshIcon
               onClick={handleRefresh}
               className="mr-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
            />
         </div>

         <div>
            <TweetBox addToList={addToList} />
         </div>

         {!!loading ? (
            <div>
               <TweetSkeleton />
               <TweetNonImageSkeleton />
               <TweetSkeleton />
               <TweetNonImageSkeleton />
               <TweetNonImageSkeleton />
            </div>
         ) : (
            <div>
               {tweets.map((tweet) => (
                  <TweetComponent
                     key={tweet.id}
                     tweet={tweet}
                     addComment={addComment}
                  />
               ))}
            </div>
         )}
      </div>
   )
}
