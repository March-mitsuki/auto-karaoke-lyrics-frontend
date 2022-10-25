import { io } from 'socket.io-client';
import React from 'react';
import { Socket } from 'socket.io-client';
import type {
    ServerToClientEvents,
    ClientToServerEvents
} from '@/interfaces/socketDataTypes';

export const socket: Socket<
    ServerToClientEvents,
    ClientToServerEvents
> = io('wss://subapi.mitsuki114514.com', {
    transports: ['websocket']
})

export const socketContext = React.createContext<
    Socket<ServerToClientEvents, ClientToServerEvents>
>(socket)

const SocketProvider = (props: { children: React.ReactNode }) => {
    return (
        <socketContext.Provider value={socket}>
            {props.children}
        </socketContext.Provider>
    )
}

export const useSocket = () => React.useContext(socketContext)

export default SocketProvider