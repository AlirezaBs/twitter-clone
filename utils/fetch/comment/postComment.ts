interface Props {
   user: number
   tweet: number
   comment: string
   jwt: string
}

export const postComments = async (props: Props) => {
   const { user, comment, tweet } = props

   let body = { user, comment, tweet }

   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/comments/`, {
      method: "POST",
      body: JSON.stringify({ data: body }),
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${props.jwt}`,
      },
   })

   if (!res.ok) {
      throw new Error("submit tweet error")
   }

   const data = await res.json()

   return data
}
