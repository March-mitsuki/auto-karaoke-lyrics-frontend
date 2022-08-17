import Head from 'next/head'
import { SocketProvider, SocketApp } from '@/components';

const Home = () => {
    return(
        <>
            <Head>
                <title>Auto-Karaoke</title>
            </Head>
            <p className='rounded-full px-3 border-2 border-gray-300'>Hello World</p>
            <SocketProvider>
                <SocketApp />
            </SocketProvider>
        </>
    )
}

export default Home;