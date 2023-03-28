import Image from "next/image"
import React, { ReactNode } from "react"
import twitter from "../../public/auth.jpg"

interface Props {
   children: ReactNode
}

export default function AuthLayout({ children }: Props) {
   return (
      <div className="grid h-screen grid-cols-2">
         <div className="hidden relative col-span-1 lg:flex items-center bg-twitter">
            <Image
               src={twitter}
               alt="TWITTER"
               loading="eager"
               layout="fill"
               objectFit="cover"
            />
         </div>

         <div className="col-span-2 lg:col-span-1 h-full">{children}</div>
      </div>
   )
}
