import { Tweet, User } from "@/types/typings"
import { GetServerSideProps } from "next"
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
         <div className="flex h-screen items-center justify-center">
            Can not fetch any data, check your INTERNET or PROXY
         </div>
      )
   }

   return (
      <Layout title={user.username}>
         <Feed tweets={tweets} title="Profile" />
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
            user
         },
      }
   } catch (e) {
      console.error(e)
      return { props: { error: true } }
   }
}
