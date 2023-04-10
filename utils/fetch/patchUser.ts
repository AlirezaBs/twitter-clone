export interface updateUser {
   id: number
   about?: string | null
   image?: File | null
   jwt: string
}

export const patchUsers = async ({ id, about, image, jwt }: updateUser) => {
   const formData = new FormData()
   about && formData.append("about", about)
   image && formData.append("files.ProfileImage", image)

   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/users/${id}/`,
      {
         method: "PUT",
         body: formData,
         headers: {
            Authorization: `Bearer ${jwt}`,
         },
      }
   )

   if (!res.ok) {
      throw new Error("submit tweet error")
   }

   const data = await res.json()

   return data
}
