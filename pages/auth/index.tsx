import AuthLayout from "@/components/layouts/authLayout"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import twitterLogo from "../../public/twitter.webp"

export default function Page() {
   return (
      <AuthLayout>
         <div className="flex h-full flex-col items-center justify-center space-y-5 p-5 dark:bg-bgDark md:p-8 lg:items-start lg:space-y-8">
            <Link href="/" className="cursor-pointer"><Image
               src={twitterLogo}
               alt="TWITTER"
               loading="eager"
               width={50}
               height={50}
            /></Link>

            <h1 className="text-center text-4xl font-extrabold lg:text-start lg:text-6xl">
               Happening Now
            </h1>
            <h2 className="text-center text-3xl font-light lg:text-start lg:text-5xl">
               Join TweetHub Today
            </h2>

            <Link
               href="/auth/signup"
               className="w-full rounded-full bg-twitter py-4 text-center text-lg font-bold text-white hover:bg-twitter/80 active:bg-twitter/70 lg:w-2/3"
            >
               Sign Up
            </Link>

            <Link
               href="/auth/login"
               className="w-full rounded-full border-2 border-twitter bg-white text-lg py-4 text-center font-bold text-twitter hover:bg-white/80 active:bg-white/70 lg:w-2/3"
            >
               Log In
            </Link>
         </div>
      </AuthLayout>
   )
}
