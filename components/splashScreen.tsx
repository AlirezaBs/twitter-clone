import Image from "next/image"
import React from "react"
import twiiterLogo from "../public/Twitter-logo.svg"

export default function SplashScreen() {
   return (
      <div className="flex flex-col space-y-2 h-screen w-screen items-center justify-center bg-twitter">
         <div className="rounded-full bg-white px-2 py-3 hover:px-3 hover:py-4 transition-all">
            <Image
               src={twiiterLogo}
               alt="twitter v2"
               width={50}
               height={50}
               className=""
            />
         </div>
         <h1 className="text-lg">twitter V0.2</h1>
      </div>
   )
}
