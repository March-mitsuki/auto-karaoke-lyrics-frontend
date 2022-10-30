import Head from 'next/head'
import Link from 'next/link'
import { SocketProvider, FileInput, PageControlBtn, StyleChangerInfo, Navi } from '@/components'
import dynamic from 'next/dynamic'
const CommandCompo = dynamic(() => import('../components/pages/command'), { ssr: false })
const Preview = dynamic(() => import('../components/pages/preview'), { ssr: false })
const DisplayStyleChanger = dynamic(() => import('../components/pages/displayStyleChanger'), {
  ssr: false,
})

const Home = () => {
  return (
    <>
      <Head>
        <title>Auto-Karaoke</title>
      </Head>
      <div className='min-h-screen bg-sky-100'>
        <Navi></Navi>
        <SocketProvider>
          <div className='sticky bg-sky-100 top-0 border-b-2 shadow-md flex gap-10 px-10 py-5 items-center min-w-full'>
            <Preview />
          </div>
          <div className='grid gap-5 px-10 py-5'>
            <div className='grid gap-5'>
              <div className='flex gap-5 items-center'>
                <StyleChangerInfo />
                <PageControlBtn />
              </div>
              <div className='flex gap-5'>
                <FileInput />
              </div>
              <div className='flex gap-5 pl-5'>
                <DisplayStyleChanger />
              </div>
            </div>
            <div>
              <CommandCompo />
            </div>
            <div>
              <Link href='/display'>
                <a className='float-right py-1 px-3 bg-sky-500 hover:bg-sky-700 rounded-full border-2 border-gray-300 text-4xl text-white'>
                  Go Display
                </a>
              </Link>
            </div>
          </div>
        </SocketProvider>
      </div>
    </>
  )
}

export default Home
