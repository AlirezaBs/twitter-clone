import React, { ReactNode } from "react"
import Head from "next/head"

import Sidebar from "../sidebar/sidebar"
import Widegts from "../widegts/widegts"

interface Props {
   children: ReactNode
   title: string
}

export default function Layout({ children, title }: Props) {
   return (
      <div className=" bg-bgLight dark:bg-bgDark">
         <Head>
            <title>{title}</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <div className="lw-screen-100 relative mx-auto overflow-hidden lg:max-w-6xl">
            <main className="grid grid-cols-10">
               <Sidebar />

               {children}

               <Widegts />
            </main>
         </div>
      </div>
   )
}
