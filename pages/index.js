import Head from 'next/head'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Devti</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        <Sidebar />
        {/* feed */}
        {/* widgets */}

        {/* modal */}
      </main>

    </div>
  )
}

export default Home
