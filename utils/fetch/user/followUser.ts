interface Props {
   userId: number
   followerIds: number[]
   jwt: string
}

// this function only put user ids that get to a followed list
export const followUser = async ({ followerIds, userId, jwt }: Props) => {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/users/${userId}`,
      {
         method: "PUT",
         body: JSON.stringify({
            follower: followerIds,
         }),
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
         },
      }
   )

   if (!res.ok) {
      throw new Error("like tweet error")
   }

   const data = await res.json()

   return data
}
