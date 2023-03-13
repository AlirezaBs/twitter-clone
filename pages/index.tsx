import { useEffect, useState } from "react"
import Head from "next/head"
import Sidebar from "@/components/sidebar/sidebar"
import Feed from "@/components/feed/feed"
import Widegts from "@/components/widegts/widegts"
import { GetServerSideProps } from "next"
import { fetchTweets } from "@/utils/fetchTweets"
import { Tweet } from "@/typings"
import { Toaster } from "react-hot-toast"
import SplashScreen from "@/components/splashScreen"

// interface Props {
//    tweets: Tweet[]
//    error?: boolean
// }

export default function Home() {
   const [mounted, setMounted] = useState<Boolean>(false)

   useEffect(() => {
      setTimeout(() => {
         setMounted(true)
      }, 2000)
   }, [])

   if (!mounted) {
      return <SplashScreen />
   }

   // if (error) {
   //    return (
   //       <div className="flex h-screen items-center justify-center">
   //          Can not fetch any data, check your INTERNET or PROXY
   //       </div>
   //    )
   // }
   return (
      <div className=" bg-bgLight transition-colors dark:bg-bgDark">
         <Head>
            <title>Twitter 2.0</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
            <div>
               <Toaster />
            </div>
            <main className="grid grid-cols-10">
               <Sidebar />

               <Feed />

               <Widegts />
            </main>
         </div>
      </div>
   )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//    const tweets = await fetchTweets()

//    if (tweets === undefined) {
//       return {
//          props: {
//             error: true,
//          },
//       }
//    }

//    return {
//       props: {
//          tweets,
//       },
//    }
// }
