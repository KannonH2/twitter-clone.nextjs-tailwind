import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from '@firebase/firestore'
import { getProviders, getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import Comment from '../../components/Comment'
import Widgets from '../../components/Widgets'
import { modalState } from '../../atoms/modalAtom'
import Modal from '../../components/Modal'
import Sidebar from '../../components/Sidebar'
import Login from '../../components/Login'
import Post from '../../components/Post'
import { db } from '../../firebase'

function PostPage({ providers, trendingResults, followResults }) {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const [post, setPost] = useState()
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState([])
  const router = useRouter()
  const { id } = router.query

  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', id), (snapshot) => {
        setPost(snapshot.data())
      }),
    [db]
  )

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  )

  if (!session) return <Login providers={providers} />

  return (
    <div>
      <Head>
        <title>
          {post?.username} on Devti: "{post?.text}"
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex min-h-screen max-w-[1500px] bg-black">
        <Sidebar />
        <div className="ml-[73px] max-w-2xl flex-grow border-l border-r border-gray-700 xl:ml-[370px]">
          <div className="sticky top-0 z-50 flex items-center gap-x-4 border-b border-gray-700 bg-black px-1.5 py-2 text-xl font-semibold text-[#d9d9d9]">
            <div className="hoverAnimation flex h-9 w-9 items-center justify-center xl:px-0">
              <ArrowLeftIcon
                className="h-5 text-white"
                onClick={() => router.push('/')}
              />
            </div>
            Devit
          </div>
          <Post id={id} post={post} postPage />
          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  comment={comment.data()}
                />
              ))}
            </div>
          )}
        </div>

        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />
        {isOpen && <Modal />}
      </main>
    </div>
  )
}

export default PostPage

export async function getServerSideProps(context) {
  const trendingResults = await fetch('https://jsonkeeper.com/b/NKEV').then(
    (res) => res.json()
  )
  const followResults = await fetch('https://jsonkeeper.com/b/WWMJ').then(
    (res) => res.json()
  )
  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  }
}
