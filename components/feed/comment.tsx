import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import { toast } from "react-hot-toast"

import {
   setProgress,
   startLoading,
   stopLoading,
} from "@/features/slices/loadingSlice"
import { postComments } from "@/utils/fetch/comment/postComment"

import { Comments, Tweet } from "@/types/typings"
import CommentsRow from "./commentRow"

interface Props {
   tweet: Tweet
   addComment: Function
}

export default function Comment({ tweet, addComment }: Props) {
   const { data: session } = useSession()
   const dispatch = useDispatch()

   const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false)
   const [commentText, setCommentText] = useState<string>("")

   const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      dispatch(startLoading())
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

         dispatch(setProgress(70))

         // get data and add to tweet list
         const id = res.data.id
         const { blockComment, createdAt, comment, updatedAt } =
            res.data.attributes
         const newComment: Comments = {
            id,
            blockComment,
            createdAt,
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
         dispatch(stopLoading())
         setCommentText("")
         setIsDisabledButton(false)
         toast.success("submitted successfully!")
      } catch (error) {
         dispatch(stopLoading())
         setIsDisabledButton(false)
         toast.error("something went wrong")
      }
   }

   return (
      <div className="hide-scrollbar my-2 mt-5 max-h-80 space-y-5 overflow-y-scroll border-t border-gray-300 p-3 py-0 dark:border-gray-500">
         <form onSubmit={handleCommentSubmit} className="flex pt-5">
            <input
               className=" flex-1 bg-transparent text-gray-500 outline-none placeholder:text-gray-400 dark:text-gray-300"
               type="text"
               placeholder="Reply your comment"
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
                     <CommentsRow key={comment.id} comment={comment} />
                  ))}
            </div>
         )}
      </div>
   )
}
