import {
   ComponentType,
   SVGProps,
   memo,
   useEffect,
   useRef,
   useState,
} from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useRouter } from "next/router"
import { signOut, useSession } from "next-auth/react"

import { useDispatch } from "react-redux"
import {
   stopLoading,
   startLoading,
   setProgress,
} from "@/features/slices/loadingSlice"
import {
   UserIcon,
   HomeIcon,
   SunIcon,
   MoonIcon,
   SearchIcon,
} from "@heroicons/react/outline"
import { toast } from "react-hot-toast"

import twiiterLogo from "../../public/twitter.webp"
import SidebarRow from "./sidebarRow"

function Sidebar() {
   const dispatch = useDispatch()
   const { data: session } = useSession()
   const { theme, setTheme } = useTheme()
   const router = useRouter()

   const [icon, setIcon] =
      useState<ComponentType<SVGProps<SVGSVGElement>>>(SunIcon)

   const path = router.asPath

   const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark")
   }

   const handleAuthClick = () => {
      if (!!!session) {
         router.push("/auth")
      } else {
         toast.success("User Logged out")
         signOut({ redirect: false })
      }
   }

   const goToHome = () => {
      if (!session) {
         toast.error("Please log in")
         return
      }

      if (`/user/${session.user.id}` === router.asPath) {
         dispatch(startLoading())
         dispatch(stopLoading())
      } else {
         dispatch(startLoading())
         router.push(`/user/${session.user.id}`)
      }
   }

   const goToFeed = () => {
      if ("/feed" === router.asPath) {
         dispatch(startLoading())
         dispatch(stopLoading())
      } else {
         dispatch(startLoading())
         router.push("/feed")
      }
   }

   useEffect(() => {
      if (theme === "light") {
         setIcon(SunIcon)
      } else {
         setIcon(MoonIcon)
      }
   }, [theme])

   return (
      <>
         <div className="fixed bottom-0 z-10 flex w-screen flex-col items-center border-t border-gray-300 bg-bgLight px-1 py-1 dark:border-gray-500 dark:bg-bgDark sm:relative sm:z-10 sm:col-span-2 sm:mt-3 sm:w-full sm:border-none sm:py-3">
            <Image
               onClick={toggleTheme}
               src={twiiterLogo}
               alt="twitter v2"
               width={40}
               height={40}
               className="mb-5 hidden sm:inline"
            />
            <div className="flex w-full flex-row items-center justify-between sm:flex-col sm:space-y-2">
               <SidebarRow
                  active={
                     !!session && path.includes(`user/${session?.user.id}`)
                  }
                  Icon={HomeIcon}
                  title="Home"
                  onClick={goToHome}
               />
               <SidebarRow
                  active={
                     !!!session ||
                     path.includes("feed") ||
                     (!!session && !path.includes(`user/${session?.user.id}`))
                  }
                  Icon={SearchIcon}
                  title="Feed"
                  onClick={goToFeed}
               />
               <SidebarRow
                  active={false}
                  Icon={UserIcon}
                  title={session ? "Log out" : "Log in"}
                  onClick={handleAuthClick}
               />
               <SidebarRow
                  active={false}
                  Icon={icon}
                  title="Theme"
                  onClick={toggleTheme}
               />
            </div>
         </div>
      </>
   )
}

export default memo(Sidebar)
