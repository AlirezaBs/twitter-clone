import React, { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"

import { useDispatch } from "react-redux"
import { startLoading, stopLoading } from "@/features/slices/loadingSlice"
import ReactTimeago from "react-timeago"
import { PencilAltIcon } from "@heroicons/react/outline"

import placeholder from "../../public/man-placeholder.png"
import ImageComponent from "../image"
import UserBoxModal from "./userBoxModal"
import Modal from "../modal"
import numberFormat from "@/utils/numberFormat"

import { User } from "@/types/typings"

interface Props {
   user: User
   tweetCount: number
}

export default function UserBox({ user, tweetCount }: Props) {
   const dispatch = useDispatch()
   const { data: session } = useSession()

   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
   const [about, setAbout] = useState(user.about)
   const userImageSrc = user?.profileImage ?? placeholder

   const handleLoading = (val: boolean) => {
      val ? dispatch(startLoading()) : dispatch(stopLoading())
   }

   useEffect(() => {
      setAbout(user.about)
   }, [user])

   return (
      <>
         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <UserBoxModal
               user={user}
               setUserAbout={(text) => setAbout(text)}
               onClose={() => setIsModalOpen(false)}
               setLoading={handleLoading}
            />
         </Modal>

         <div className="hide-scrollbar relative flex flex-col space-y-2 overflow-scroll border-x border-b border-gray-200 p-5 dark:border-gray-700 ">
            <div className="flex flex-row items-center justify-start space-x-4">
               <ImageComponent
                  src={userImageSrc as string}
                  width={56}
                  height={54}
                  className="h-20 w-20 rounded-full border-2 border-gray-200 dark:border-gray-700"
               />

               <div className="flex items-center justify-start space-x-5 md:space-x-11">
                  <div className="flex flex-col items-center justify-center text-sm text-gray-400">
                     <span>{numberFormat(tweetCount)}</span>
                     <span>Tweets</span>
                  </div>

                  <div className="flex flex-col items-center justify-center text-sm text-gray-400">
                     <span>{numberFormat(tweetCount)}</span>
                     <span>Followers</span>
                  </div>

                  <div className="flex flex-col items-center justify-center text-sm text-gray-400">
                     <span>{numberFormat(tweetCount)}</span>
                     <span>Following</span>
                  </div>
               </div>
            </div>

            <div className="w-full">
               <p className="inline text-sm font-bold hover:cursor-pointer">
                  {user.username}
               </p>

               <p
                  className={`whitespace-pre-line text-sm text-gray-600 dark:text-gray-300 ${
                     !!!about && "text-gray-700 dark:text-gray-200"
                  }`}
               >
                  {about ? about : "About me ..."}
               </p>

               <span className="text-xs text-gray-400">
                  Joined <ReactTimeago date={user.createdAt} />
               </span>
            </div>

            {session?.user.id === user.id && (
               <PencilAltIcon
                  className="absolute right-3 top-2 h-5 w-5 cursor-pointer text-twitter"
                  onClick={() => setIsModalOpen(true)}
               />
            )}
         </div>
      </>
   )
}
