import { RefreshIcon } from "@heroicons/react/outline"
import React, { useEffect, useState } from "react"
import TweetBox from "./tweetBox"
import { Comments, Tweet, User } from "@/types/typings"
import toast from "react-hot-toast"
import TweetComponent from "./tweet"
import { feedData } from "@/utils/fetch/feedData"
import TweetSkeleton from "../skeleton/tweetSkeleton"
import TweetNonImageSkeleton from "../skeleton/tweetNonImageSkeleton"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { userTweets } from "@/utils/fetch/userTweets"
import UserBox from "./userBox"

interface Props {
   tweets: Tweet[]
   title: string
   user?: User
}

export default function Feed({ tweets: tweetsProp, title, user }: Props) {
   const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
   const [loading, setLoading] = useState<boolean>(true)
   const { data: session } = useSession()
   const router = useRouter()
   const path = router.asPath
   const { slug: userId } = router.query

   const handleRefresh = async () => {
      setLoading(true)
      let tweets: Tweet[] = []

      if (path.includes("/feed")) {
         tweets = await feedData()
      } else {
         tweets = await userTweets(userId as string)
      }

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

   const addComment = (newComment: Comments, tweetId: number) => {
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
      setTweets(tweetsProp)
   }, [tweetsProp])

   useEffect(() => {
      if (tweets) {
         setTimeout(() => {
            setLoading(false)
         }, 500)
      }
   }, [tweetsProp, tweets])

   return (
      <div className="hide-scrollbar dw-screen-100 col-span-10 overflow-scroll pb-20 sm:col-span-8 md:col-span-7 lg:col-span-5">
         <div className="tap sticky top-0 z-10 flex items-center justify-between border-x border-b border-gray-200 py-4 backdrop-blur-xl dark:border-gray-700 sm:py-6">
            {!!session ? (
               <h1 className="pl-5 pb-0 text-xl font-bold text-twitter">
                  Hello {session.user.username}
               </h1>
            ) : (
               <h1 className="pl-5 pb-0 text-xl font-bold text-twitter">
                  {title}
               </h1>
            )}
            <RefreshIcon
               onClick={handleRefresh}
               className="mr-5 h-8 w-8 transform-gpu cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125 active:focus:rotate-180"
            />
         </div>

         {/* display only in users profile page */}
         {!!user && (
         <div>
            <UserBox user={user} />
         </div>
         )}

         <div>
            <TweetBox addToList={addToList} />
         </div>

         {!!loading ? (
            <div className="mt-3 flex flex-col space-y-3">
               <TweetNonImageSkeleton />
               <TweetSkeleton />
               <TweetNonImageSkeleton />
               <TweetSkeleton />
               <TweetNonImageSkeleton />
            </div>
         ) : (
            <div className="mt-3 flex flex-col space-y-3">
               {tweets.length === 0 && (
                  <div className="flex h-full items-center justify-center text-gray-400 dark:text-gray-500">
                     No Tweets Found
                  </div>
               )}
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
