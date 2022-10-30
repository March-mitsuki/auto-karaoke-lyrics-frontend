import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

import {
  Navi,
  Preview,
  StyleChangerInfo,
  PageControlBtn,
  FileInput,
  DisplayStyleChanger,
  CommandCompo,
} from '@/components'

import type { Socket } from 'socket.io-client'
import type { ServerToClientEvents, ClientToServerEvents } from '@/interfaces/socketDataTypes'

const EventPage = () => {
  const hasInitialized = useRef(false)
  const router = useRouter()
  const { eid } = router.query

  let wsUrl: string
  let wsTransports: string[]
  if (process.env.NODE_ENV === 'production') {
    wsUrl = process.env.PRO_WS_URL!
    wsTransports = ['websocket']
  } else {
    wsUrl = process.env.DEV_WS_URL!
    wsTransports = ['polling', 'websocket']
  }
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(wsUrl, {
    transports: wsTransports,
  })

  const pageChangeHandler = () => {
    console.log('now page change')
    socket.disconnect()
  }
  useEffect(() => {
    router.events.on('routeChangeStart', pageChangeHandler)
    if (!hasInitialized.current) {
      socket.on('connect', () => {
        console.log('now client connect')
        socket.emit('join_room', eid as string)
        socket.emit('reload_setlist')
      })
    }
    hasInitialized.current = true
    return () => {
      router.events.off('routeChangeStart', pageChangeHandler)
    }
  })

  return (
    <div className='min-h-screen bg-sky-100'>
      <div className=''>
        <Navi eid={eid as string}></Navi>
        <div className='sticky top-0 border-b-2 shadow-md flex gap-10 px-10 py-5 items-center min-w-full bg-sky-100'>
          <Preview ws={socket} />
        </div>
        <div>now eid: {eid}</div>
        <div className='grid gap-5 px-10 py-5'>
          <div className='grid gap-5'>
            <div className='flex gap-5 items-center'>
              <StyleChangerInfo />
              <PageControlBtn ws={socket} />
            </div>
            <div className='flex gap-5'>
              <FileInput ws={socket} />
            </div>
            <div className='flex gap-5 pl-5'>
              <DisplayStyleChanger ws={socket} />
            </div>
          </div>
          <div>
            <CommandCompo ws={socket} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPage
