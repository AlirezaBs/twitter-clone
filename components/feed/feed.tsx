import { RefreshIcon } from "@heroicons/react/outline"
import React, { useEffect, useState } from "react"
import TweetBox from "./tweetBox"
import { Tweet } from "@/typings"
import toast from "react-hot-toast"

interface Props {
   tweets: Tweet[]
}

export default function Ffdeed() {
   // const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
   const [loading, setLoading] = useState<boolean>(true)

   // const handleRefresh = async () => {
   //    setLoading(true)
   //    const tweets = await fetchTweets()
   //    if (tweets) {
   //       setTweets(tweets)
   //       toast.success("Feed updated")
   //    } else {
   //       toast.error("Can't update now")
   //    }
   // }

   // useEffect(() => {
   //    if (tweets) {
   //       setLoading(false)
   //    }
   // }, [tweetsProp, tweets])

   return (
      <div className="col-span-8 h-screen overflow-scroll border-x-2 transition dark:border-gray-600 md:col-span-7 lg:col-span-5">
         <div className="my-5 flex items-center justify-between">
            <h1 className="pl-5 pb-0 text-xl font-bold">Home</h1>
            <RefreshIcon
               // onClick={handleRefresh}
               className="mr-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
            />
         </div>

         <div>
            <TweetBox />
         </div>

         {/* {!!loading ? (
            <div>skleton loading</div>
         ) : (
            <div>
               {tweets.map((tweet) => (
                  <TweetComponent key={tweet._id} tweet={tweet} />
               ))}
            </div>
         )} */}
      </div>
   )
}
