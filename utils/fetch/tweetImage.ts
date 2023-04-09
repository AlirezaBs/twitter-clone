export const getTweetImage = async (id: number) => {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE_URL}api/tweetImage/${id}`
   )

   if (res.status === 500) throw new Error("Internal Server Error")
   else if (res.status !== 200) throw new Error("Fetching Error")

   const image = await res.json()
   return image
}
