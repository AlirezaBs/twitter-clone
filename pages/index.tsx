import React, { useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import SplashScreen from "@/components/splashScreen"

export default function Page() {
   const router = useRouter()

   useEffect(() => {
      setTimeout(() => {
         router.push("/feed")
      }, 500)
   }, [router])

   return (
      <>
         <Head>
            <title>TweetHub</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <SplashScreen />
      </>
   )
}
