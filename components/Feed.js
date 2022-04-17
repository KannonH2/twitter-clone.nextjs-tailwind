import { SparklesIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import Input from './Input'
import { onSnapshot, collection, query, orderBy } from '@firebase/firestore'
import { db } from '../firebase'
import Post from "./Post";
import { useSession } from 'next-auth/react'

function Feed() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    return (
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs)
        }
      ),
      [db]
    )
  })

  return (
    <div
      className="ml-[73px] max-w-2xl flex-grow border-l border-r border-gray-700
    text-white xl:ml-[370px]"
    >
      <div
        className="sticky top-0  flex items-center justify-between
        bg-black py-2 px-3 text-[#d9d9d9] bg-opacity-90 "
      >
        <h2 className="text-lg font-bold sm:text-xl">Home</h2>
        <div className="hoverAnimation x-9 ml-auto h-9 items-center justify-center p-2 xl:px-0">
          <SparklesIcon className="h-5 text-white" />
        </div>
      </div>
      <Input />

      <div className="pb-72">
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  )
}

export default Feed
