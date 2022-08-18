import Head from 'next/head'
import Link from 'next/link';
import {
    SocketProvider,
    FileInput,
    OrderCompo
} from '@/components';


const Home = () => {
    return(
        <>
            <Head>
                <title>Auto-Karaoke</title>
            </Head>
            <div className='h-screen bg-sky-100'>
                <h1 className='text-center rounded-full px-3 py-2 border-2 border-gray-300 text-4xl'>Auto Lyrics Player</h1>
                <SocketProvider>
                    <div className='px-5 py-2 mt-4 mt-2'>
                        <FileInput />
                    </div>
                    <div className='px-5 py-2 mt-2 mb-6'>
                        <OrderCompo />
                    </div>
                    <Link href='/display'>
                        <div className='text-right'>
                            <a className='bg-sky-500 hover:bg-sky-700 rounded-full px-10 py-2 mx-10 border-2 border-gray-300 text-4xl'>
                                Go Display
                            </a>
                        </div>
                    </Link>
                </SocketProvider>
            </div>
        </>
    )
}

export default Home;