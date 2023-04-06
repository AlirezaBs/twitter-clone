import React, { ReactNode } from "react"
import Image from "next/image"
import Head from "next/head"

import twitter from "../../public/auth.jpg"

interface Props {
   children: ReactNode
}

export default function AuthLayout({ children }: Props) {
   return (
      <>
      <Head>
            <title>Auth | TweetHub</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
      <div className="grid h-screen grid-cols-2">
         <div className="hidden relative col-span-1 lg:flex items-center bg-twitter">
            <Image
               src={twitter}
               alt="TWITTER"
               loading="eager"
               layout="fill"
               objectFit="cover"
            />
         </div>

         <div className="col-span-2 lg:col-span-1 h-full">{children}</div>
      </div>
      </>)
}
