interface Props {
   Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
   title: string
   active: boolean
}

export default function SidebarRow({ Icon, title, active }: Props) {
   return (
      <div
         className={`flex w-full cursor-pointer items-center space-x-2 rounded-full px-4 py-2 transition-all hover:bg-gray-100 hover:text-twitter dark:hover:bg-gray-200 ${
            active
               ? "bg-gray-100 text-twitter dark:bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-300"
               : ""
         }`}
      >
         <Icon className="h-6 w-6" />
         <p className="hidden text-base font-light md:inline-flex lg:text-xl">
            {title}
         </p>
      </div>
   )
}
