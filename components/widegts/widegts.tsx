import { SearchIcon } from "@heroicons/react/outline"
import React from "react"
import { TwitterTimelineEmbed } from "react-twitter-embed"

export default function Widegts() {
   return (
      <div className="col-span-3 mt-2 hidden px-2 lg:inline">
         <div className="my-2 flex items-center space-x-1 rounded-full bg-gray-100 p-3 text-gray-400">
            <SearchIcon className="h-5 w-5" />
            <input
               type="text"
               placeholder="Search Twitter"
               className="flex-1 bg-transparent outline-none break-words"
            />
         </div>

         <TwitterTimelineEmbed
            sourceType="profile"
            screenName="KingJames"
            options={{ height: 1000 }}
         />
      </div>
   )
}
