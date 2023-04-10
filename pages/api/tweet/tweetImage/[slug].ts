import { NextApiRequest, NextApiResponse } from "next"
import qs from "qs"

const queryParams = qs.stringify(
   {
      populate: {
         image: {
            fields: ["url"],
         },
      },
   },
   {
      encodeValuesOnly: true, // prettify URL
   }
)

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<any | { message: string }>
) {
   const { slug } = req.query   

   try {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}api/tweets/${slug}?${queryParams}`
      )

      const data = await response.json()
      const image = data.data.attributes.image.data.attributes.url

      res.status(200).json(image)
   } catch (error) {
      res.status(500).json({ message: "Internal server error" })
   }
}
