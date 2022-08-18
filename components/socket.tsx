import { io } from 'socket.io-client';
import React from 'react';
import { Socket } from 'socket.io-client';

const socket = io('ws://subapi.mitsuki114514.com')
export const socketContext = React.createContext<Socket>(socket)

// class SocketProviderClass extends React.Component<{ children: React.ReactNode }> {
//     constructor(props: { children: React.ReactNode }) {
//         super(props);
//     }

//     render(): React.ReactNode {
//         return (
//             <socketContext.Provider value={socket}>
//                 {this.props.children}
//             </socketContext.Provider>
//         )
//     }
// }

const SocketProvider = (props: { children: React.ReactNode }) => {
    return (
        <socketContext.Provider value={socket}>
            {props.children}
        </socketContext.Provider>
    )
}

export const useSocket = () => React.useContext(socketContext)

export default SocketProvider