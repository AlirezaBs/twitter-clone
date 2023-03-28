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
import { useSession } from "next-auth/react"
import { postTweet } from "@/utils/fetch/postTweet"
import { toast } from "react-hot-toast"
import { Tweet } from "@/types/typings"
import imageLoader from "@/utils/imageLoader"

interface Props {
   addToList: Function
}

export default function TweetBox({ addToList }: Props) {
   const [input, setInput] = useState<string>("")
   const [showImageInput, setShowImageInput] = useState<boolean>(false)
   const [showImage, setShowImage] = useState<boolean>(false)
   const [imageInputValue, setImageInputValue] = useState<string>("")
   const { data: session } = useSession()

   const handleImage = (e: React.FormEvent) => {
      e.preventDefault()
      setShowImageInput(false)
      setShowImage(true)
   }

   const handleSubmit = async () => {
      try {
         if (!session?.user?.id || !session?.user?.jwt) {
            throw new Error("User ID is undefined")
         }

         const res = await postTweet({
            id: +session.user.id,
            text: input,
            image: imageInputValue,
            jwt: session.user.jwt,
         })

         // get data and add to tweet list
         const id = res.data.id
         const { blockTweet, createdAt, likes, text, updatedAt } =
            res.data.attributes
         const newTweet: Tweet = {
            id,
            blockTweet,
            createdAt,
            likes,
            text,
            updatedAt,
            user: {
               id: session.user.id,
               username: session.user.username,
               blocked: session.user.blocked,
               profileImage: session.user?.image,
            },
            comments: [],
         }
         addToList(newTweet)
         toast.success("submitted successfully!")
      } catch (error) {
         toast.error("something went wrong!")
      }
   }

   return (
      <div className="flex flex-col space-x-2 border-b-2 p-5 transition border-gray-300 dark:border-gray-600 ">
         <div className="flex space-x-2">
            {session?.user?.image ? (
               <Image
                  loader={() => imageLoader(session.user.image as string)}
                  src={session?.user?.image}
                  alt=""
                  width={56}
                  height={54}
                  className="mt-4 h-14 w-14 rounded-full"
               />
            ) : (
               <Image
                  src={placeholder}
                  alt=""
                  width={56}
                  height={54}
                  className="mt-4 h-14 w-14 rounded-full"
               />
            )}

            <div className="flex flex-1">
               <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                  placeholder="What's Happening?"
                  className="lg h-24 w-full bg-transparent text-sm text-gray-400 outline-none placeholder:text-sm dark:text-gray-200 md:text-lg md:placeholder:text-lg"
               />
            </div>
         </div>

         <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
               <PhotographIcon
                  onClick={() => setShowImageInput(!showImageInput)}
                  className="h-5 w-5 cursor-pointer transition-all duration-150 ease-out hover:scale-150"
               />
               <SearchCircleIcon className="h-5 w-5 cursor-pointer transition-all duration-150 ease-out hover:scale-150" />
               <EmojiHappyIcon className="h-5 w-5 cursor-pointer transition-all duration-150 ease-out hover:scale-150" />
               <CalendarIcon className="h-5 w-5 cursor-pointer transition-all duration-150 ease-out hover:scale-150" />
               <LocationMarkerIcon className="h-5 w-5 cursor-pointer transition-all duration-150 ease-out hover:scale-150" />
            </div>

            <button
               disabled={!input || !!!session}
               onClick={handleSubmit}
               className="rounded-full bg-twitter px-3 py-1 font-bold text-white transition-all duration-200 hover:bg-blue-400 disabled:opacity-40 disabled:hover:bg-twitter md:px-5 md:py-2"
            >
               Tweet
            </button>
         </div>

         {showImageInput && (
            <form
               onSubmit={handleImage}
               className="mt-3 flex h-14 flex-row overflow-hidden rounded-lg border-2 border-gray-300 text-xs transition dark:border-gray-500 md:text-sm"
            >
               <input
                  className=" flex-1 bg-transparent pl-2 text-gray-500 outline-none placeholder:text-gray-400"
                  type="text"
                  value={imageInputValue}
                  placeholder="http:// Image section not working now!"
                  onChange={(e) => setImageInputValue(e.target.value)}
               ></input>
               <button className="bg-gray-200 px-2 transition dark:bg-gray-600">
                  Submit
               </button>
            </form>
         )}
      </div>
   )
}
