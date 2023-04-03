export interface PostTweet {
   id: number
   text: string
   image?: File | null
   jwt: string
}

export const postTweet = async ({ id, text, image, jwt }: PostTweet) => {
   const postData = {user: id, text}

   const formData = new FormData()
   formData.append("data", JSON.stringify(postData))
   image && formData.append("files.image", image)

   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/tweets/`, {
      method: "POST",
      body: formData,
      headers: {
         Authorization: `Bearer ${jwt}`,
      },
   })

   if (res.status !== 200) {
      throw new Error("submit tweet error")
   }


   const data = await res.json()

   return data
}
