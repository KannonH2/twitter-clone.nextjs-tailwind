import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useRecoilState } from 'recoil'
import { modalState, postIdState } from '../atoms/modalAtom'
import { DotsHorizontalIcon } from '@heroicons/react/outline'

export default function DropdownDots() {
  const [isOpen, setIsOpen] = useRecoilState(modalState)

  return (
    <>
        <div className="px-1 py-1 ">
         asdasdasd
        </div>
    </>
  )
}
