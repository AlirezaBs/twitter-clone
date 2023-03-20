interface IFormInput {
   username: string
   email: string
   password: number
}

export async function signUp(data: IFormInput) {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/auth/local/register`,
      {
         method: "POST",
         body: JSON.stringify(data),
         headers: {
            "Content-Type": "application/json",
         },
      }
   )

   const response = await res.json()

   if (!res.ok) throw new Error(response.error.message)

   return response
}
