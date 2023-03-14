import { useEffect, useState } from "react"
import Head from "next/head"
import Sidebar from "@/components/sidebar/sidebar"
import Feed from "@/components/feed/feed"
import Widegts from "@/components/widegts/widegts"
import { GetServerSideProps } from "next"
import { Tweet } from "@/typings"
import { Toaster } from "react-hot-toast"
import SplashScreen from "@/components/splashScreen"
import fetch from "isomorphic-unfetch"
import * as qs from "qs"
import { parseTweetData } from "@/utils/homeDataParse"

interface Props {
   tweets: Tweet[]
   error?: boolean
}

export default function Home({ tweets, error }: Props) {
   const [mounted, setMounted] = useState<Boolean>(false)

   console.log(tweets)

   useEffect(() => {
      setTimeout(() => {
         setMounted(true)
      }, 2000)
   }, [])

   if (!mounted) {
      return <SplashScreen />
   }

   if (error) {
      return (
         <div className="flex h-screen items-center justify-center">
            Can not fetch any data, check your INTERNET or PROXY
         </div>
      )
   }
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

export const getServerSideProps: GetServerSideProps = async (context) => {
   const queryParams = qs.stringify(
      {
         fields: ["text", "blockTweet", "likes", "createdAt", "updatedAt"],
         populate: {
            image: {
               fields: ["url"],
            },
            user: {
               fields: ["username", "blocked"],
               populate: {
                  profileImage: {
                     fields: ["url"],
                  },
               },
            },
            comments: {
               fields: [
                  "comment",
                  "blockComment",
                  "likes",
                  "createdAt",
                  "updatedAt",
               ],
               populate: {
                  user: {
                     fields: ["username", "blocked"],
                     populate: {
                        profileImage: {
                           fields: ["url"],
                        },
                     },
                  },
               },
            },
         },
      },
      {
         encodeValuesOnly: true, // prettify URL
      }
   )
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}api/tweets?${queryParams}`
      )
      const data = await res.json()

      const tweets: Tweet[] = parseTweetData(data.data)

      return {
         props: {
            tweets,
         },
      }
   } catch (e) {
      console.error(e)
      return { props: { error: true } }
   }
}
