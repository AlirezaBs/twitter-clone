import { ComponentType, SVGProps, memo, useEffect, useState } from "react"
import Image from "next/image"
import {
   BellIcon,
   HashtagIcon,
   BookmarkIcon,
   CollectionIcon,
   MailIcon,
   UserIcon,
   HomeIcon,
   SunIcon,
   MoonIcon,
} from "@heroicons/react/outline"
import twiiterLogo from "../../public/Twitter-logo.svg"
import SidebarRow from "./sidebarRow"
import { useTheme } from "next-themes"
import { useRouter } from "next/router"
import { signOut, useSession } from "next-auth/react"

function Sidebar() {
   const [icon, setIcon] =
      useState<ComponentType<SVGProps<SVGSVGElement>>>(SunIcon)
   const { data: session } = useSession()
   const { theme, setTheme } = useTheme()
   const router = useRouter()
   const path = router.asPath

   const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark")
   }

   const handleAuthClick = () => {
      !!!session ? router.push("/auth") : signOut({ redirect: false })
   }

   useEffect(() => {
      if (theme === "light") {
         setIcon(SunIcon)
      } else {
         setIcon(MoonIcon)
      }
   }, [theme])

   return (
      <div className="absolute bottom-0 z-50 flex w-screen flex-col items-center border-t border-gray-300 bg-bgLight px-4 py-3 transition dark:border-gray-500 dark:bg-bgDark sm:relative sm:col-span-2 sm:w-full sm:border-none">
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
               active={path.includes("user")}
               Icon={HomeIcon}
               title="Home"
            />
            <SidebarRow
               active={path.includes("explore")}
               Icon={HashtagIcon}
               title="Explore"
               onClick={() => path !== "/explore" && router.push("/explore")}
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
   )
}

export default memo(Sidebar)
