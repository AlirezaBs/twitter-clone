import SplashScreen from "@/components/splashScreen"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

export default function Page() {
   const router = useRouter()

   useEffect(() => {
      setTimeout(() => {
         router.push("/feed")
      }, 1000)
   }, [router])

   return <SplashScreen />
}
