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
         className={`flex w-fitt cursor-pointer items-center space-x-2 rounded-full px-4 py-2 transition-all hover:bg-gray-100 hover:text-twitter dark:hover:bg-gray-200 ${
            active
               ? "bg-gray-100 text-twitter hover:bg-gray-200 dark:bg-gray-100 dark:hover:bg-gray-300"
               : ""
         }`}
         onClick={onClick}
      >
         <Icon className="h-6 w-6" />
         <p className="hidden text-base font-light lg:inline-flex lg:text-xl">
            {title}
         </p>
      </div>
   )
}
