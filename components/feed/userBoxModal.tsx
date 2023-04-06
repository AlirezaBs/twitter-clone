import { ChangeEvent, useState } from "react"
import { useSession } from "next-auth/react"

import { PencilAltIcon } from "@heroicons/react/outline"
import { toast } from "react-hot-toast"

import ImageComponent from "../image"
import placeholder from "../../public/man-placeholder.png"
import { patchUsers, updateUser } from "@/utils/fetch/patchUser"

import { User } from "@/types/typings"

interface Props {
   user: User
   onClose: Function
   setLoading: Function
}

export default function UserBoxModal({ user, setLoading, onClose }: Props) {
   const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false)
   const [file, setFile] = useState<File>()
   const [about, setAbout] = useState(user.about)

   const { data: session } = useSession()

   const userImageSrc = file
      ? (URL.createObjectURL(file) as string)
      : user?.profileImage ?? placeholder

   const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
      const selectedImage = e.target.files?.[0]
      if (selectedImage) {
         setFile(selectedImage)
      }
   }

   const handleSubmit = async () => {
      setIsDisabledButton(true)
      setLoading(true)

      try {
         const patchBody: updateUser = {
            id: user.id,
            jwt: session?.user.jwt as string,
         }
         if (file) {
            patchBody.image = file
         }
         if (about !== user.about) {
            patchBody.about = about
         }

         const res = await patchUsers(patchBody)

         setLoading(false)
         onClose()
      } catch (err) {
         setIsDisabledButton(false)
         setLoading(false)
         toast.error("something went wrong!")
      }
   }

   return (
      <>
         <div className="flex flex-1 flex-col items-center justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
            <div className="relative h-fit w-fit rounded-full">
               <ImageComponent
                  src={userImageSrc}
                  width={70}
                  height={70}
                  className="h-28 w-28 rounded-full border-2 border-gray-200 dark:border-gray-700"
               />
               <label
                  htmlFor="imageInput"
                  className=" absolute top-0 h-full w-full cursor-pointer rounded-full bg-gray-300/50 "
               >
                  <PencilAltIcon className="absolute top-1/2 left-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-twitter" />
               </label>
               <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => handleImageUpload(e)}
               />
            </div>

            <textarea
               value={about}
               placeholder="... ..."
               onChange={(e) => setAbout(e.target.value)}
               className="min-h-[85px] w-full flex-1 resize-y rounded-lg border border-gray-200 bg-inherit p-2 pb-0 text-sm text-gray-600 outline-none transition focus:ring-1 dark:border-gray-700 dark:text-gray-300 sm:min-h-[110px] sm:text-base"
            ></textarea>
         </div>

         <div className="mt-4 flex justify-end space-x-3">
            <button
               type="submit"
               disabled={isDisabledButton}
               onClick={() => onClose()}
               className="rounded-full border-2 border-twitter bg-white py-2 px-4 text-twitter hover:bg-white/90 focus:active:bg-white/80 disabled:opacity-40"
            >
               Cancel
            </button>
            <button
               type="submit"
               disabled={
                  (about === user.about && file === undefined) ||
                  isDisabledButton
               }
               onClick={handleSubmit}
               className="rounded-full bg-twitter py-2 px-4 text-white hover:bg-twitter/80 focus:active:bg-twitter/80 disabled:opacity-40"
            >
               Submit
            </button>
         </div>
      </>
   )
}
