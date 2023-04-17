import { Tweet, User } from "@/types/typings"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Layout from "@/components/layouts/layout"
import Feed from "@/components/feed/feed"
import { userTweets } from "@/utils/fetch/userTweets"
import { singleUser } from "@/utils/fetch/singleUser"

interface Props {
   tweets: Tweet[]
   error?: boolean
   user: User
}

export default function Page({ tweets, error, user }: Props) {
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
                  <p className="text-center px-2">Can not fetch any data, check your INTERNET or PROXY</p>
                  <button
                     className="mt-3 hover:bg-twitter transition hover:text-white rounded-lg border border-twitter bg-transparent px-2 py-1"
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
      <Layout title={`${user.username} | TweetHub`}>
         <Feed tweets={tweets} title="Profile" user={user} />
      </Layout>
   )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
   const userId = params?.slug
   try {
      const tweets = await userTweets(userId as string)
      const user = await singleUser(userId as string)

      return {
         props: {
            tweets,
            user,
         },
      }
   } catch (e) {
      console.error(e)
      return { props: { error: true } }
   }
}
