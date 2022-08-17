import { io } from 'socket.io-client';
import React from 'react';
import { Socket } from 'socket.io-client';

const socket = io("ws://subapi.mitsuki114514.com")
export const socketContext = React.createContext<Socket>(socket)

class SocketProvider extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <socketContext.Provider value={socket} {...this.props}/>
        )
    }
}

export const useSocket = () => React.useContext(socketContext)

export default SocketProvider