import { ChangeEvent, useState } from "react"
import { User } from "@/types/typings"
import ImageComponent from "../image"
import placeholder from "../../public/man-placeholder.png"
import { PencilAltIcon } from "@heroicons/react/outline"

interface Props {
   user: User
}

export default function UserBoxModal({ user }: Props) {
   const [file, setFile] = useState<File>()
   const userImageSrc = file ? URL.createObjectURL(file) as string : user?.profileImage ?? placeholder

   const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
      const selectedImage = e.target.files?.[0]
      if (selectedImage) {
         setFile(selectedImage)
      }
   }

   return (
      <div className="flex flex-1 flex-col lg:flex-row">
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
      </div>
   )
}
