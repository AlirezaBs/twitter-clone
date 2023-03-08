import { SearchIcon } from "@heroicons/react/outline"
import React from "react"

export default function Widegts() {
   return (
      <div className="col-span-3 mt-2 hidden px-2 lg:inline">
         <div className="my-2 flex items-center space-x-1 rounded-full bg-gray-100 p-3 text-gray-400 transition dark:bg-gray-600 dark:text-gray-200">
            <SearchIcon className="h-5 w-5" />
            <input
               type="text"
               placeholder="Search Twitter"
               className="flex-1 break-words bg-transparent outline-none"
            />
         </div>
      </div>
   )
}
