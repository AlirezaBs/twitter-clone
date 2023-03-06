import React, { useState } from "react"
import Image from "next/image"
import placeholder from "../../public/man-placeholder.png"
import {
   CalendarIcon,
   EmojiHappyIcon,
   LocationMarkerIcon,
   PhotographIcon,
   SearchCircleIcon,
} from "@heroicons/react/outline"

export default function TweetBox() {
   const [input, setInput] = useState<string>("")

   return (
      <div className="flex space-x-2 p-5 border-t-2 border-b-2">
         <Image
            src={placeholder}
            alt=""
            width={56}
            height={54}
            className="mt-4 h-14 w-14 rounded-full"
         />

         <div className="flex flex-1 items-center pl-2">
            <form className="flex flex-1 flex-col">
               <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                  placeholder="What's Happening?"
                  className=" h-24 w-full text-xl text-gray-400 outline-none placeholder:text-xl"
               />
               <div className="flex items-center">
                  <div className="flex flex-1 space-x-2 text-twitter">
                     <PhotographIcon className="h-5 w-5 cursor-pointer transition-all duration-150 ease-out hover:scale-150" />
                     <SearchCircleIcon className="h-5 w-5 cursor-pointer transition-all duration-150 ease-out hover:scale-150" />
                     <EmojiHappyIcon className="h-5 w-5 cursor-pointer transition-all duration-150 ease-out hover:scale-150" />
                     <CalendarIcon className="h-5 w-5 cursor-pointer transition-all duration-150 ease-out hover:scale-150" />
                     <LocationMarkerIcon className="h-5 w-5 cursor-pointer transition-all duration-150 ease-out hover:scale-150" />
                  </div>

                  <button
                     disabled={!input}
                     className="rounded-full bg-twitter px-5 py-2 font-bold text-white transition-all duration-200 hover:bg-blue-400 disabled:opacity-40 disabled:hover:bg-twitter"
                  >
                     Tweet
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}
