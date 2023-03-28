import { GetServerSideProps } from "next"
import Feed from "@/components/feed/feed"
import { Tweet } from "@/types/typings"
import { feedData } from "@/utils/fetch/feedData"
import Layout from "@/components/layouts/layout"

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
      <Layout title="Explore">
         <Feed tweets={tweets} title="Explore" />
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
