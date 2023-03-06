interface Props {
   Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
   title: string
}

export default function SidebarRow({ Icon, title }: Props) {
   return (
      <div className="flex w-full cursor-pointer items-center space-x-2 rounded-full px-4 py-2 transition-all  duration-300 hover:bg-gray-100 hover:text-twitter">
         <Icon className="h-6 w-6" />
         <p className="hidden text-base font-light md:inline-flex lg:text-xl">
            {title}
         </p>
      </div>
   )
}
