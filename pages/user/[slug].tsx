import { Tweet, User } from "@/types/typings"
import { GetStaticPaths, GetStaticProps } from "next"
import Layout from "@/components/layouts/layout"
import Feed from "@/components/feed/feed"
import { userTweets } from "@/utils/fetch/userTweets"
import { GetUsersList } from "@/utils/fetch/usersList"

interface Props {
   tweets: Tweet[]
   error?: boolean
}

export default function Page({ tweets, error }: Props) {
   if (error) {
      return (
         <div className="flex h-screen items-center justify-center">
            Can not fetch any data, check your INTERNET or PROXY
         </div>
      )
   }

   return (
      <Layout title="profile">
         <Feed tweets={tweets} title="Profile" />
      </Layout>
   )
}

export const getStaticPaths: GetStaticPaths = async () => {
   const users = await GetUsersList()

   const paths = users.map((user) => ({
      params: { slug: user.id },
   }))

   return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const userId = params?.slug
   try {
      const tweets = await userTweets(userId as string)

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
