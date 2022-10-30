import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect } from 'react'
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
  const router = useRouter()
  const { eid } = router.query
  if (typeof eid !== 'string') {
    return
  }

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

  useEffect(() => {
    socket.on('connect', () => {
      console.log('now connection')
      socket.emit('join_room', eid)
    })
    return () => {
      if (socket.connected) {
        socket.close()
      }
    }
  }, [socket])

  return (
    <div className='min-h-screen bg-sky-100'>
      <div className=''>
        <Navi eid={eid}></Navi>
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
