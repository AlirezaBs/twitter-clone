import Image from "next/image"
import React from "react"
import twiiterLogo from "../public/twitter.webp"

export default function SplashScreen() {
   return (
      <div className="flex flex-col space-y-5 h-screen w-screen items-center justify-center bg-white">
            <Image
               src={twiiterLogo}
               alt="tweethub"
               width={50}
               height={50}
               className="transition-all hover:scale-125"
            />
         <h1 className="text-lg text-twitter">TweetHub</h1>
      </div>
   )
}
