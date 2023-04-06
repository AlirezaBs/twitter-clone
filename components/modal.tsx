import { ReactNode } from "react"

interface Props {
   isOpen: boolean
   onClose: Function
   children: ReactNode
}

// just the layout of a modal and a layer beyond -- all content must be added with children
export default function Modal({ isOpen, onClose, children }: Props) {
   if (!isOpen) return null

   return (
      <>
         <div
            className="fixed left-0 top-0 z-40 h-screen w-screen bg-gray-800/10 backdrop-blur-sm dark:bg-gray-400/10"
            onClick={() => onClose()}
         ></div>

         <div className="absolute left-1/2 top-1/2 z-50 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-gray-200 bg-bgLight p-5 dark:border-gray-700 dark:bg-bgDark sm:w-[70%] lg:w-[60%]">
            {children}
         </div>
      </>
   )
}
