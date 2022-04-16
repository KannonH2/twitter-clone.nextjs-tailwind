import {
  PhotographIcon,
  XIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  CalendarIcon,
} from '@heroicons/react/outline'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState, createRef } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { db, storage, uploadImage } from '../firebase'
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore'
import { getDownloadURL, ref, uploadString } from '@firebase/storage'
import { useSession } from 'next-auth/react'
import { useRecoilState } from "recoil";
import { modalInputState, postInputIdState, postIdState } from "../atoms/modalAtom";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

function InputModal() {
  const { data: session } = useSession()
  const [input, setInput] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [showEmojis, setShowEmojis] = useState(false)
  const filePickerRef = createRef(null)
  const [loading, setLoading] = useState(false)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [postId, setPostId] = useRecoilState(postIdState);
  const [isOpenModal, setIsOpenModal] = useRecoilState(modalInputState)
  const [postInputId, setPostInputId] = useRecoilState(postInputIdState)

  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', postId), (snapshot) => {
        setPost(snapshot.data())
      }),
    [db]
  )

  const addEmoji = (e) => {
    let sym = e.unified.split('-')
    let codesArray = []
    sym.forEach((el) => codesArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codesArray)
    setInput(input + emoji)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  const sendPost = async () => {
    if (loading) return
    setLoading(true)

    const docRef = await addDoc(collection(db, 'posts'), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    })
    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadUrl = await getDownloadURL(imageRef)
        await updateDoc(doc(db, `posts`, docRef.id), {
          image: downloadUrl,
        })
      })
    }
    setLoading(false)
    setInput('')
    setSelectedFile(null)
    setShowEmojis(false)
  }

  // const handleDragEnter = (e) => {
  //   e.preventDefault()
  //   setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  // }

  // const handleDragLeave = (e) => {
  //   e.preventDefault()
  //   setDrag(DRAG_IMAGE_STATES.NONE)
  // }

  // const uploadImage = (file) => {
  //   const task = storage.ref(`posts/${session.user.uid}/image`).put(file)
  //   setDrag(DRAG_IMAGE_STATES.UPLOADING)
  //   return task
  // }

  // const handleDrop = (e) => {
  //   e.preventDefault()
  //   setDrag(DRAG_IMAGE_STATES.NONE)
  //   const file = e.dataTransfer.files[0]
  //   console.log()

  //   const task = uploadImage(file)
  //   setTask(task)
  // }

  return (
    <Transition.Root show={isOpenModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 pt-8"
        onClose={setIsOpenModal}
      >
        <div className="flex min-h-[800px] items-start justify-center px-4 pt-4 pb-20 text-center sm:block sm:min-h-screen sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block transform overflow-hidden rounded-2xl bg-black text-left   
              align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:align-middle"
            >
              <div
                className={`overflow-y flex space-x-3 border-b border-gray-700 p-3 ${
                  loading && 'opacity-60'
                }`}
              >
                <img
                  src={session.user.image}
                  alt=""
                  className="h-11 w-11 cursor-pointer rounded-full xl:mr-2.5"
                />
                <div className="w-full divide-y divide-gray-700">
                  <div
                    className={`${selectedFile && 'pb-7'} ${
                      input && 'space-y-2.5'
                    }`}
                  >
                    <textarea
                      value={input}
                      rows="2"
                      onChange={(e) => setInput(e.target.value)}
                      // onDragEnter={handleDragEnter}
                      // onDragLeave={handleDragLeave}
                      // onDrop={handleDrop}
                      placeholder="What's happening?"
                      className="min-h-[50px] w-full bg-transparent text-lg tracking-wide 
            text-[#d9d9d9] placeholder-gray-500 outline-none"
                    />
                    {selectedFile && (
                      <div className="relative">
                        <div
                          className="absolute top-1 left-1 flex h-8 w-8 cursor-pointer items-center 
                justify-center rounded-full bg-[#15181c] bg-opacity-75 hover:bg-[#272c26]"
                          onClick={() => setSelectedFile(null)}
                        >
                          <XIcon className="h-5 text-white" />
                        </div>
                        <img
                          src={selectedFile}
                          alt=""
                          className="max-h-80 rounded-2xl object-contain"
                        />
                      </div>
                    )}
                  </div>
                  {!loading && (
                    <div className="flex items-center justify-between pt-2.5">
                      {/* el evento onClick hace referenca al input escondido, para que el icono custom funcione al presionarlo */}
                      <div className="flex items-center">
                        <div
                          className="icon"
                          onClick={() => filePickerRef.current.click()}
                        >
                          <PhotographIcon className="h-6 text-[#1d9bf0]" />
                          <input
                            type="file"
                            onChange={addImageToPost}
                            ref={filePickerRef}
                            hidden
                          />
                        </div>
                        <div className="icon rotate-90">
                          <ChartBarIcon className="h-6 text-[#1d9bf0]" />
                        </div>

                        <div
                          className="icon"
                          onClick={() => setShowEmojis(!showEmojis)}
                        >
                          <EmojiHappyIcon className="h-6 text-[#1d9bf0]" />
                        </div>

                        <div className="icon">
                          <CalendarIcon className="h-6 text-[#1d9bf0]" />
                        </div>

                        {showEmojis && (
                          <Picker
                            onSelect={addEmoji}
                            style={{
                              position: 'absolute',
                              marginTop: '465px',
                              marginLeft: -40,
                              maxWidth: '320px',
                              borderRadius: '20px',
                            }}
                            theme="dark"
                          />
                        )}
                      </div>
                      <button
                        className="rounded-full bg-[#1d9bf0] px-4 py-1.5 font-bold text-white shadow-md
           hover:bg-[#1a8cd8] disabled:cursor-default disabled:opacity-50 disabled:hover:bg-[#1d9bf0]"
                        disabled={!input.trim() && !selectedFile}
                        onClick={sendPost}
                      >
                        Devit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default InputModal
