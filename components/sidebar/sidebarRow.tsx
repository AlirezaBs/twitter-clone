import React from "react"

interface Props {
   Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
   title: string
   active: boolean
   onClick?: () => void
}

export default function SidebarRow({ Icon, title, active, onClick }: Props) {
   return (
      <div
         className={`flex lg:flex-row flex-col w-fitt cursor-pointer items-center justify-center lg:space-x-2 rounded-full px-4 py-1 sm:py-2 active:focus:outline-none hover:bg-gray-100 hover:text-twitter dark:hover:bg-gray-800 ${
            active
               ? "sm:bg-gray-100 text-twitter sm:hover:bg-gray-200 sm:dark:bg-gray-700 sm:dark:hover:bg-gray-300"
               : ""
         }`}
         onClick={onClick}
      >
         <Icon className="h-6 w-6" />
         <p className={`text-sm sm:text-base text-center lg:text-xl ${active ? "font-bold" : "font-light"}`}>
            {title}
         </p>
      </div>
   )
}
