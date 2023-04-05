import React from "react"
import twiiterLogo from "../public/twitter.webp"
import ImageComponent from "./image"

export default function SplashScreen() {
   return (
      <div className="flex flex-col space-y-5 lw-screen-100 w-screen items-center justify-center bg-white">
            <ImageComponent
               src={twiiterLogo}
               alt="tweethub"
               width={50}
               height={50}
               className="transition-all focus:active:hover:scale-125"
            />
         <h1 className="text-lg text-twitter">TweetHub</h1>
      </div>
   )
}
