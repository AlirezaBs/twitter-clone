import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "next-themes"
import { Toaster } from "react-hot-toast"
import { SessionProvider } from "next-auth/react"
import { Heebo } from "@next/font/google"
import AppLayout from "@/components/layouts/appLayout"
import store from "@/features/store"
import { Provider } from "react-redux"
import LoadingBarComponent from "@/components/loadingBar"

const heebo = Heebo({
   subsets: ["latin"],
   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export default function App({
   Component,
   pageProps: { session, ...pageProps },
}: AppProps) {
   return (
      <Provider store={store}>
         <ThemeProvider attribute="class" enableSystem={true}>
            <SessionProvider session={session}>
               <AppLayout>
                  <LoadingBarComponent />
                  <Toaster />
                  <main className={`${heebo.className}`}>
                     <Component {...pageProps} />
                  </main>
               </AppLayout>
            </SessionProvider>
         </ThemeProvider>
      </Provider>
   )
}
