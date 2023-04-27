import React, { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"

import { useDispatch } from "react-redux"
import { startLoading, stopLoading } from "@/features/slices/loadingSlice"
import ReactTimeago from "react-timeago"
import { PencilAltIcon } from "@heroicons/react/outline"
import { toast } from "react-hot-toast"

import placeholder from "../../public/man-placeholder.png"
import ImageComponent from "../image"
import UserBoxModal from "./userBoxModal"
import Modal from "../modal"
import numberFormat from "@/utils/numberFormat"
import { followUser } from "@/utils/fetch/user/followUser"
import imageLoader from "@/utils/imageLoader"

import { User } from "@/types/typings"

interface Props {
   user: User
   tweetCount: number
}

export default function UserBox({ user: userProps, tweetCount }: Props) {
   const dispatch = useDispatch()
   const { data: session } = useSession()

   const [user, setUser] = useState<User>(userProps)
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
   const [about, setAbout] = useState(user.about)
   const [isUserFollowed, setIsUserFollowed] = useState<boolean>(false)
   const [isUserFollowing, setIsUserFollowing] = useState<boolean>(false)
   const [isFollowDisabled, setIsFollowDisabled] = useState<boolean>(false)

   const userImageSrc = user?.profileImage
      ? imageLoader(user.profileImage)
      : placeholder

   const handleLoading = (val: boolean) => {
      val ? dispatch(startLoading()) : dispatch(stopLoading())
   }

   const handleFollow = async () => {
      if (!!!session) {
         toast.error("Sign in first!")
         return
      }

      setIsFollowDisabled(true)
      try {
         if (!isUserFollowed) {
            const followerIds = [
               ...user.followers.map((user) => user.id),
               +session?.user.id,
            ]

            const res = await followUser({
               userId: user.id,
               followerIds: followerIds,
               jwt: session.user.jwt,
            })

            setUser((prev) => {
               const updatedFollowers = [
                  ...prev.followers,
                  { id: session.user.id },
               ]
               return { ...prev, followers: updatedFollowers }
            })
         } else if (isUserFollowed) {
            const followerIds = [...user.followers.map((user) => user.id)]
            let updateLikedIds = followerIds.filter(
               (id) => +id !== +session.user.id
            )

            const res = await followUser({
               userId: user.id,
               followerIds: followerIds,
               jwt: session.user.jwt,
            })

            setUser((prev) => {
               const updatedFollowers = prev.followers.filter(
                  (user) => +user.id !== +session.user.id
               )
               return { ...prev, followers: updatedFollowers }
            })
         }
      } catch (err) {
         console.error("something went wrong!")
         toast.error("something went wrong!")
      }
      setIsFollowDisabled(false)
   }

   useEffect(() => {
      const isFollowed: boolean =
         !!session &&
         !!user.followers.find((user) => +user.id === +session.user.id)

      const isFollowing: boolean =
         !!session &&
         !!user.followings.find((user) => +user.id === +session.user.id)

      setIsUserFollowing(isFollowing)
      setIsUserFollowed(isFollowed)
   }, [session, user])

   useEffect(() => {
      setUser(userProps)
   }, [userProps])

   useEffect(() => {
      setAbout(user.about)
   }, [user])

   useEffect(() => {
      setUser((user) => ({ ...user, about: about }))
   }, [about])

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

               <div className="flex w-full items-center justify-between sm:justify-start sm:space-x-11">
                  <div className="flex cursor-default flex-col items-center justify-center text-sm text-gray-400">
                     <span>{numberFormat(tweetCount)}</span>
                     <span className="text-xs">Tweets</span>
                  </div>

                  <div className="flex cursor-default flex-col items-center justify-center text-sm text-gray-400">
                     <span>{numberFormat(+user.followers?.length)}</span>
                     <span className="text-xs">Followers</span>
                  </div>

                  <div className="flex cursor-default flex-col items-center justify-center text-sm text-gray-400">
                     <span>{numberFormat(+user.followings?.length)}</span>
                     <span className="text-xs">Following</span>
                  </div>
               </div>
            </div>

            <div className="w-full">
               <div className="mb-2 flex items-center justify-between">
                  <p className="inline text-sm font-bold hover:cursor-pointer">
                     {user.username}
                  </p>

                  {session?.user.id !== user.id && (
                     <button
                        onClick={handleFollow}
                        disabled={isFollowDisabled}
                        className={`w-[100px] cursor-pointer rounded-full border-2 py-1 font-bold transition-transform disabled:scale-95 disabled:opacity-75 md:w-[140px] ${
                           isUserFollowed
                              ? " border-twitter/40 bg-bgLight text-gray-600 hover:bg-gray-100/80 dark:bg-bgDark dark:text-gray-200 hover:dark:bg-gray-800/80"
                              : "border-twitter bg-twitter text-white hover:bg-twitter/80"
                        }`}
                     >
                        {isUserFollowed
                           ? "Unfollow"
                           : isUserFollowing
                           ? "Follow Back"
                           : "Follow"}
                        {isFollowDisabled && "..."}
                     </button>
                  )}
               </div>

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
