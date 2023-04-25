interface Props {
    tweetId: number
    userId: number[]
    jwt: string
 }
 
 // this function only put user ids that get to a tweet likes list
 export const likeTweet = async ({ tweetId, userId, jwt }: Props) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/tweets/${tweetId}`, {
       method: "PUT",
       body: JSON.stringify({
        data: {
            likes: userId
        }
       }),
       headers: {
         "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
       },
    })
 
    if (!res.ok) {
       throw new Error("like tweet error")
    }
 
    const data = await res.json()
 
    return data
 }
 