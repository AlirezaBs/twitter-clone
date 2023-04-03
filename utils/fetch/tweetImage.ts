import qs from "qs"

export const getTweetImage = async (id: number) => {
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

   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/tweets/${id}?${queryParams}`
   )

   if (res.status !== 200) {
      throw new Error("submit tweet error")
   }

   const data = await res.json()

   const image = data.data.attributes.image.data.attributes.url

   return image
}
