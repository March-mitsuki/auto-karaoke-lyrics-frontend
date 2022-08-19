import Head from 'next/head';
import Link from 'next/link';
import {
    SocketProvider,
    FileInput,
} from '@/components';
import dynamic from "next/dynamic";
const OrderCompo = dynamic(() => import('../components/pages/order'), {ssr: false})
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
                    <div className='container min-w-full mx-auto flex px-10 py-2 mt-4 mb-2'>
                        <Preview />
                    </div>
                    <div className='px-5 py-2 mt-4 mb-2'>
                        <FileInput />
                    </div>
                    <div className='px-5 py-2 mt-2 mb-6'>
                        <OrderCompo />
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