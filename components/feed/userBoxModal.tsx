import { User } from "@/types/typings"

interface Props {
   isOpen: boolean
   user: User
   onClose: Function
}

export default function UserBoxModal({ isOpen, onClose, user }: Props) {
   if (!isOpen) return null

   return (
      <div className="">
         <div className="absolute left-0 top-0 z-40 h-screen w-screen backdrop-blur-sm" onClick={() => onClose()}></div>

         <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-bgLight dark:bg-bgDark flex flex-col lg:flex-row border-2 border-gray-200 dark:border-gray-700 p-5 rounded-lg">
            hello
         </div>
      </div>
   )
}
