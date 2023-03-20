import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "next-themes"
import { Toaster } from "react-hot-toast"
import { SessionProvider } from "next-auth/react"

export default function App({
   Component,
   pageProps: { session, ...pageProps },
}: AppProps) {
   return (
      <ThemeProvider attribute="class" enableSystem={true}>
         <SessionProvider session={session}>
            <Toaster />
            <Component {...pageProps} />
         </SessionProvider>
      </ThemeProvider>
   )
}
