import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Navi: React.FC<{ eid: string }> = (props) => {
  const router = useRouter()
  const { eid } = router.query

  return (
    <div className='flex items-center gap-5 px-3 py-2 border-b-2 border-gray-300'>
      <Link href='/'>
        <button className='flex items-center gap-1 px-2 py-1 rounded-md hover:bg-sky-300'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
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
      <Link href={`/display/${eid}`}>
        <button className='flex items-center gap-1 px-2 py-1 rounded-md hover:bg-sky-300'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z'
            />
          </svg>
          Display
        </button>
      </Link>
    </div>
  )
}

export default Navi
