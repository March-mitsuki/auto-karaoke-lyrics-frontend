import { useRouter } from "next/router"
import { useEffect } from "react"
import { io } from 'socket.io-client'

import { SocketDisplay } from "@/components"

import type { Socket } from 'socket.io-client'
import type { ServerToClientEvents, ClientToServerEvents } from '@/interfaces/socketDataTypes'

const Display = () => {
  const router = useRouter()
  const { eid } = router.query
  if (typeof eid !== "string") {
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
    <SocketDisplay ws={socket} />
  )
}

export default Display
