import Head from 'next/head';
import Link from 'next/link';
import {
    SocketProvider,
    FileInput,
    DisplayStyleChanger
} from '@/components';
import dynamic from 'next/dynamic';
const CommandCompo = dynamic(() => import('../components/pages/command'), {ssr: false})
const Preview = dynamic(() => import('../components/pages/preview'), {ssr: false})


const Home = () => {
    return(
        <>
            <Head>
                <title>Auto-Karaoke</title>
            </Head>
            <div className='min-h-screen bg-sky-100'>
                <h1 className='text-center px-3 py-2 border-b-2 shadow-md border-gray-300 text-4xl'>
                    Auto Lyrics Player
                </h1>
                <SocketProvider>
                    <div className='container items-center min-w-full mx-auto flex px-10 py-2 mt-4 mb-2'>
                        <Preview />
                    </div>
                    <div className='px-5 py-2 mt-4 mb-2'>
                        <FileInput />
                        <div className='flex px-5 mt-2'>
                            <div className='flex rounded-lg bg-red-300 px-5 py-1 mt-2'>
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                                <span className='ml-4'>构建css时请遵循csstype和json文件的规则</span>
                                <a href='https://github.com/frenic/csstype' className='ml-4 underline'>具体请看这里</a>
                            </div>
                        </div>
                        <div className='flex py-2 mt-2'>
                            <DisplayStyleChanger />
                        </div>
                    </div>
                    <div className='px-5 py-2 mt-2 mb-6'>
                        <CommandCompo />
                    </div>
                    <div className='text-right'>
                        <Link href='/display'>
                            <a className='bg-sky-500 hover:bg-sky-700 rounded-full px-10 py-2 mx-10 border-2 border-gray-300 text-4xl text-white'>
                                Go Display
                            </a>
                        </Link>
                    </div>
                </SocketProvider>
            </div>
        </>
    )
}

export default Home;