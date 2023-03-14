import Image from "next/image"
import React from "react"
import twiiterLogo from "../public/Twitter-logo.svg"

export default function SplashScreen() {
   return (
      <div className="flex flex-col space-y-5 h-screen w-screen items-center justify-center bg-white">
            <Image
               src={twiiterLogo}
               alt="twitter v2"
               width={50}
               height={50}
               className="transition-all hover:scale-125"
            />
         <h1 className="text-lg text-twitter">twitter V0.2</h1>
      </div>
   )
}
