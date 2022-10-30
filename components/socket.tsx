import { io } from 'socket.io-client'
import React from 'react'
import { Socket } from 'socket.io-client'
import type { ServerToClientEvents, ClientToServerEvents } from '@/interfaces/socketDataTypes'

let wsUrl: string
let wsTransports: string[]
if (process.env.NODE_ENV === 'production') {
  wsUrl = process.env.PRO_WS_URL!
  wsTransports = ['websocket']
} else {
  wsUrl = process.env.DEV_WS_URL!
  wsTransports = ['polling', 'websocket']
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(wsUrl, {
  transports: wsTransports,
})

export const socketContext =
  React.createContext<Socket<ServerToClientEvents, ClientToServerEvents>>(socket)

const SocketProvider = (props: { children: React.ReactNode }) => {
  return <socketContext.Provider value={socket}>{props.children}</socketContext.Provider>
}

export const useSocket = () => React.useContext(socketContext)

export default SocketProvider
