interface Props {
    commentId: number
    userId: number[]
    jwt: string
 }
 
 // this function only put user ids that get to a tweet likes list
 export const likeComment = async ({ commentId, userId, jwt }: Props) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/comments/${commentId}`, {
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
 