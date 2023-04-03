import React from "react"

export default function UserSkeleton() {
   return (
      <div className="w-full px-2">
         <div className="flex animate-pulse flex-row items-center space-x-3">
            <div className="h-12 w-12">
               <svg
                  className="h-12 w-12 text-gray-300 transition-colors dark:text-gray-600"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     fill-rule="evenodd"
                     d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                     clip-rule="evenodd"
                  ></path>
               </svg>
            </div>
            <div className="flex-1">
               <div className="h-2 w-1/2 rounded-full bg-gray-300 transition-colors dark:bg-gray-600"></div>
               <div className="mt-2 h-3 w-3/4  rounded-full bg-gray-200 transition-colors dark:bg-gray-700"></div>
            </div>

            <div className="h-8 w-12 rounded-full bg-gray-200 transition-colors dark:bg-gray-500"></div>
         </div>
      </div>
   )
}
