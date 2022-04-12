import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Devti</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        <Sidebar />
        <Feed/>
        {/* widgets */}

        {/* modal */}
      </main>

    </div>
  )
}

export default Home
