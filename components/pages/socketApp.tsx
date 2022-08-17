import React from "react";
import { useSocket, socketContext } from "@/components"

const SocketApp = () => {
    const socket = useSocket()
    socket.on('firstConnetion', (data) => {
        console.log('client connection: ', data.id);
    })
    if (socket.id) {
        return (
            <>
                <div>当前连接id: {socket.id}</div>
            </>
        )
    } else {
        return (
            <>
                <div>正在连接</div>
            </>
        )
    }
}

export default SocketApp