interface Props {
   id: number
   text: string
   image?: string | null
   jwt: string
}

export const postTweet = async (props: Props) => {
   const { id, text, image } = props

   let body = {}
   if (image) {
      body = { user: id, text, image}
   } else {
      body = { user: id, text}
   }

   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/tweets/`, {
      method: "POST",
      body: JSON.stringify({"data": body}),
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${props.jwt}`,
      },
   })

   if (res.status !== 200) {
      throw new Error("submit tweet error")
   }

   const data = await res.json()

   return data
}
