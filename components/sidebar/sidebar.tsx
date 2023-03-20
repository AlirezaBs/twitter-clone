import Image from "next/image"
import {
   BellIcon,
   HashtagIcon,
   BookmarkIcon,
   CollectionIcon,
   MailIcon,
   UserIcon,
   HomeIcon,
   DotsCircleHorizontalIcon,
} from "@heroicons/react/outline"
import twiiterLogo from "../../public/Twitter-logo.svg"
import SidebarRow from "./sidebarRow"
import { useTheme } from "next-themes"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

export default function Sidebar() {
   const { data: session } = useSession()
   const { theme, setTheme } = useTheme()
   const router = useRouter()
   const path = router.asPath

   console.log(session)

   const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark")
   }

   const handleAuth = () => {
      console.log("hello")
      if (!!!session) {
         router.push("/auth")
      }
   }

   return (
      <div className="col-span-2 flex flex-col items-center px-4 pt-3 lg:items-start ">
         <Image
            onClick={toggleTheme}
            src={twiiterLogo}
            alt="twitter v2"
            width={40}
            height={40}
            className="m-3 mb-5"
         />
         <div className="w-fitt flex flex-col items-center space-y-2">
            <SidebarRow active={path === "/"} Icon={HomeIcon} title="Home" />
            <SidebarRow
               active={path === "explore"}
               Icon={HashtagIcon}
               title="Explore"
            />
            <SidebarRow
               active={path === "notifications"}
               Icon={BellIcon}
               title="Notifications"
            />
            <SidebarRow
               active={path === "messages"}
               Icon={MailIcon}
               title="Messages"
            />
            <SidebarRow
               active={path === "bookmarks"}
               Icon={BookmarkIcon}
               title="Bookmarks"
            />
            <SidebarRow
               active={path === "lists"}
               Icon={CollectionIcon}
               title="Lists"
            />
            <SidebarRow
               active={false}
               Icon={UserIcon}
               title={session ? "Log out" : "log in"}
               clicked={handleAuth}
            />

            <SidebarRow
               active={false}
               Icon={DotsCircleHorizontalIcon}
               title="More"
            />
         </div>
      </div>
   )
}
