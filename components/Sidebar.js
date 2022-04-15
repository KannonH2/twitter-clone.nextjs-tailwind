import Image from 'next/image'
import React from 'react'
import { HomeIcon } from '@heroicons/react/outline'
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from '@heroicons/react/outline'
import SidebarLink from '../components/SidebarLink'
import {signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function Sidebar() {
  const {data : session} = useSession();
  const router = useRouter();

  return (
    <div
      className="fixed h-full flex-col 
    items-center p-2 flex xl:w-[340px] xl:items-start"
    >
      <div
        className="hoverAnimation flex h-14 w-14 items-center 
      justify-center p-0 xl:ml-24"
      >
        <Image src="/white-logo.png" height={30} width={40} onClick={() => router.push("/")}/>
      </div>
      <div className="mt-4 mb-2.5 space-y-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active onClick={() => router.push("/")}/>
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      <button
        className="ml-auto hidden h-[52px] w-56 
      rounded-full bg-[#1d9bf0] text-lg font-bold text-white shadow-md 
      hover:bg-[#1a8cd8] xl:inline">
        Devit
      </button>
      <div className='text-[#d9d9d9] flex items-center justify-center
       hoverAnimation xl:ml-auto xl:-mr-5 mt-auto'
        onClick={signOut}>
        <img src={session.user.image}
         alt=""
         className='h-10 w-10 rounded-full xl:mr-2.5'/>
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">{session.user.name}</h4>
          <p className="text-[#6e767d]">@{session.user.tag}</p>
        </div>
        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
      </div>
    </div>
  )
}

export default Sidebar
