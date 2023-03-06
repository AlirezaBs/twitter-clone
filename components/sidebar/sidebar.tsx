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
import twiiterLogo from "../../public/Twitter-logo.svg.webp"
import SidebarRow from "./sidebarRow"

export default function Sidebar() {
   return (
      <div className="col-span-2 flex flex-col items-center px-4 md:items-start ">
         <Image src={twiiterLogo} alt="twitter v2" width={40} height={40} className="m-3" />

         <SidebarRow Icon={HomeIcon} title="Home" />
         <SidebarRow Icon={HashtagIcon} title="Explore" />
         <SidebarRow Icon={BellIcon} title="Notifications" />
         <SidebarRow Icon={MailIcon} title="Messages" />
         <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
         <SidebarRow Icon={CollectionIcon} title="Lists" />
         <SidebarRow Icon={UserIcon} title="Sign In" />

         <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
      </div>
   )
}
