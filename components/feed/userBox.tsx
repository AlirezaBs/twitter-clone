import React, { useRef, useState } from "react"
import { useSession } from "next-auth/react"

import LoadingBar, { LoadingBarRef } from "react-top-loading-bar"
import ReactTimeago from "react-timeago"
import { PencilAltIcon } from "@heroicons/react/outline"

import placeholder from "../../public/man-placeholder.png"
import ImageComponent from "../image"
import UserBoxModal from "./userBoxModal"
import Modal from "../modal"

import { User } from "@/types/typings"

interface Props {
   user: User
}

export default function UserBox({ user }: Props) {
   const barRef = useRef<LoadingBarRef>(null)
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
   const { data: session } = useSession()
   const userImageSrc = user?.profileImage ?? placeholder

   const handleLoading = (val: boolean) => {
      val ? barRef.current?.continuousStart() : barRef.current?.complete()
   }

   return (
      <>
         <LoadingBar className="z-50" color="#00aded" ref={barRef} />

         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <UserBoxModal
               user={user}
               onClose={() => setIsModalOpen(false)}
               setLoading={handleLoading}
            />
         </Modal>

         <div className="text relative flex flex-row items-start space-x-3 border-x border-b border-gray-200 p-5 dark:border-gray-700 ">
            <ImageComponent
               src={userImageSrc as string}
               width={56}
               height={54}
               className="h-20 w-20 rounded-full border-2 border-gray-200 dark:border-gray-700"
            />

            <div className="flex flex-1 flex-col items-start justify-between space-y-2">
               <p className="inline text-sm font-bold hover:cursor-pointer">
                  {user.username}
               </p>

               <p className="whitespace-pre-line text-sm text-gray-600 dark:text-gray-300">
                  {user.about ? user.about : "About me ..."}
               </p>

               <div className="flex flex-row space-x-3">
                  <span className="text-xs text-gray-400">
                     {/* {profile?.connection || 0} Connetction */}0 Connections
                  </span>

                  <span className="text-xs text-gray-400">
                     Joined <ReactTimeago date={user.createdAt} />
                  </span>
               </div>
            </div>

            {session?.user.id === user.id && (
               <PencilAltIcon
                  className="absolute right-5 top-5 h-5 w-5 cursor-pointer text-twitter"
                  onClick={() => setIsModalOpen(true)}
               />
            )}
         </div>
      </>
   )
}