import Image from 'next/image'
import React, { useState } from 'react'
import { HomeIcon, XIcon } from '@heroicons/react/outline'
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
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import InputModal from '../components/InputModal'

function Sidebar() {
  const { data: session } = useSession()
  const router = useRouter()
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const customStyles = {
    content: {
      top: '10%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-100%',
      transform: 'translate(-35%, -20%)',
      borderRadius: '50px',
      width: '50%',
      backgroundColor: 'transparent',
      border: 'none',
      background: 'transparent',
      boxShadow: 'none',
      opacity: '100%',
    },
  }

  return (
    <div
      className="fixed flex h-full 
    flex-col items-center p-2 xl:w-[340px] xl:items-start"
    >
      <div
        className="hoverAnimation flex h-14 w-14 items-center 
      justify-center p-0 xl:ml-24"
      >
        <Image
          src="/white-logo.png"
          height={30}
          width={40}
          onClick={() => router.push('/')}
        />
      </div>
      <div className="mt-4 mb-2.5 space-y-2.5 xl:ml-24">
        <SidebarLink
          text="Home"
          Icon={HomeIcon}
          active
          onClick={() => router.push('/')}
        />
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
      hover:bg-[#1a8cd8] xl:inline"
        onClick={() => setModalIsOpen(true)}
      >
        Devit
      </button>
      <Modal
        //className="modalStyle"
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <InputModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      </Modal>

      <div
        className="hoverAnimation mt-auto flex items-center
       justify-center text-[#d9d9d9] xl:ml-auto xl:-mr-5"
        onClick={signOut}
      >
        <img
          src={session.user.image}
          alt=""
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />
        <div className="hidden leading-5 xl:inline">
          <h4 className="font-bold">{session.user.name}</h4>
          <p className="text-[#6e767d]">@{session.user.tag}</p>
        </div>
        <DotsHorizontalIcon className="ml-10 hidden h-5 xl:inline" />
      </div>
    </div>
  )
}

export default Sidebar
