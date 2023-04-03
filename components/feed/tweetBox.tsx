import React, { ChangeEvent, useRef, useState } from "react"
import placeholder from "../../public/man-placeholder.png"
import { EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/outline"
import { useSession } from "next-auth/react"
import { PostTweet, postTweet } from "@/utils/fetch/postTweet"
import { toast } from "react-hot-toast"
import { Tweet } from "@/types/typings"
import { useRouter } from "next/router"
import ImageComponent from "../image"
import { getTweetImage } from "@/utils/fetch/tweetImage"
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar"

interface Props {
   addToList: Function
}

export default function TweetBox({ addToList }: Props) {
   const barRef = useRef<LoadingBarRef>(null)
   const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false)
   const [input, setInput] = useState<string>("")
   const [file, setFile] = useState<File>()
   const { data: session } = useSession()
   const router = useRouter()
   const path = router.asPath
   const userImageSrc = session?.user?.image ?? placeholder

   const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
      const selectedImage = e.target.files?.[0]
      if (selectedImage) {
         setFile(selectedImage)
      }
   }

   const handleSubmit = async () => {
      setIsDisabledButton(true)
      barRef.current?.continuousStart()

      try {
         if (!session?.user?.id || !session?.user?.jwt) {
            throw new Error("User ID is undefined")
         }

         // prepare tweet data
         let tweetData: PostTweet = {
            id: +session.user.id,
            text: input,
            jwt: session.user.jwt,
            image: null,
         }
         if (file) {
            tweetData.image = file
         }

         const res = await postTweet(tweetData)

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

         //get image and append it to newTweet
         let image: string
         if (file) {
            image = await getTweetImage(id as number)
            newTweet.image = image
         }

         // dont update feed data if we are in other users profile
         if (
            path.includes(`user/${session.user.id}`) ||
            path.includes("feed")
         ) {
            addToList(newTweet)
         }
         setInput("")
         setFile(undefined)
         setIsDisabledButton(false)
         barRef.current?.complete()
         toast.success("submitted successfully!")
      } catch (error) {
         setIsDisabledButton(false)
         barRef.current?.complete()
         toast.error("something went wrong!")
      }
   }

   return (
      <>
         <LoadingBar className="z-50" color="#00aded" ref={barRef}/>

         <div
            className={`flex flex-col space-x-2 rounded-b-lg border-x border-b border-gray-200 p-5 dark:border-gray-700`}
         >
            <div className="flex space-x-2">
               {!path.includes("/user/") && (
                  <ImageComponent
                     height={54}
                     width={54}
                     src={userImageSrc as string}
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
                  <label htmlFor="imageInput">
                     <PhotographIcon className="h-6 w-6 cursor-pointer" />
                  </label>
                  <input
                     id="imageInput"
                     type="file"
                     accept="image/*"
                     className="sr-only"
                     onChange={(e) => handleImageUpload(e)}
                  />
                  <EmojiHappyIcon className="h-6 w-6 cursor-pointer" />
               </div>

               <button
                  disabled={!input || !session || isDisabledButton}
                  onClick={handleSubmit}
                  className="rounded-full bg-twitter px-3 py-1 font-bold text-white duration-200 hover:bg-blue-400 disabled:opacity-40 disabled:hover:bg-twitter md:px-5 md:pt-2 md:pb-1"
               >
                  Tweet
               </button>
            </div>

            {file && (
               <div className="relative w-full">
                  <XIcon
                     className="absolute right-3 top-5 h-10 w-10 cursor-pointer rounded-full text-red-500 hover:bg-red-500/40"
                     onClick={() => setFile(undefined)}
                  />
                  <ImageComponent
                     src={URL.createObjectURL(file) as string}
                     width={250}
                     height={70}
                     className="max-w-64 ml-auto mt-4 h-32 rounded-lg border border-gray-200 dark:border-gray-700"
                  />
               </div>
            )}
         </div>
      </>
   )
}
