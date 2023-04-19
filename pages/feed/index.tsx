import { GetServerSideProps } from "next"
import Head from "next/head"
import Feed from "@/components/feed/feed"
import { Tweet } from "@/types/typings"
import { feedData } from "@/utils/fetch/tweet/feedData"
import Layout from "@/components/layouts/layout"

interface Props {
   tweets: Tweet[]
   error?: boolean
}

export default function Page({ tweets, error }: Props) {
   if (error) {
      return (
         <>
            <Head>
               <title>Error | tweethub</title>
               <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
               />
               <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex h-screen items-center justify-center">
               <div className="flex flex-col items-center justify-center">
                  <p className="px-2 text-center">
                     Can not fetch any data, check your INTERNET or PROXY
                  </p>
                  <button
                     className="mt-3 rounded-lg border border-twitter bg-transparent px-2 py-1 transition hover:bg-twitter hover:text-white"
                     onClick={() => window.location.reload()}
                  >
                     Reload
                  </button>
               </div>
            </div>
         </>
      )
   }

   return (
      <Layout title="Feed | TweetHub">
         <Feed tweets={tweets} title="Feed" />
      </Layout>
   )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   try {
      const tweets = await feedData()

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
