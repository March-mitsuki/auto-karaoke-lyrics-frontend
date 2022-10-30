import Head from 'next/head'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <Head>
        <title>Auto-Karaoke</title>
      </Head>
      <div className='min-h-screen bg-sky-100'>
        <div className='flex items-center gap-5 px-3 py-2 border-b-2 border-gray-300 shadow-md'>
          <Link href='/'>
            <button className='flex items-center gap-1 px-2 py-1 rounded-md hover:bg-sky-300'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                />
              </svg>
              Home
            </button>
          </Link>
          <Link href='events/test'>
            <button className='flex items-center gap-1 px-2 py-1 rounded-md hover:bg-sky-300'>
              EventsTest
            </button>
          </Link>
        </div>
        <div>Home Page Here</div>
      </div>
    </>
  )
}

export default Home
