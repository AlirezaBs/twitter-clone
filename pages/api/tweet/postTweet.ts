import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<any | { message: string }>
) {
   const formData = req.body
   const auth = req.headers.authorization


   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}api/tweets/`,
         {
            method: "POST",
            body: formData,
            
            headers: {
               Authorization: `${auth}`,
            },
         }
      )

      const data = await response.json()
      res.status(200).json(data)
   } catch (error) {
      res.status(500).json({ message: "Internal server error" })
   }
}
