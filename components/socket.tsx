import { io } from 'socket.io-client';
import React from 'react';
import { Socket } from 'socket.io-client';
import type {
    ServerToClientEvents,
    ClientToServerEvents
} from '@/interfaces/socketDataTypes';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('ws://subapi.mitsuki114514.com')

export const socketContext = React.createContext<
    Socket<ServerToClientEvents, ClientToServerEvents>
>(socket)

const SocketProvider = (props: { children: React.ReactNode }) => {
    return (
        <socketContext.Provider value={socket} {...props}>
            {props.children}
        </socketContext.Provider>
    )
}

export const useSocket = () => React.useContext(socketContext)

export default SocketProvider