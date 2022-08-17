import React, { useState } from "react";
import { useSocket, socketContext } from "@/components"
import type { LyricsData } from "@/interfaces/socketDataTypes";

const SocketApp = () => {
    const socket = useSocket();
    const [text, setText] = useState('')
    const [ruby, setRuby] = useState('')

    socket.on('first_connetion', (data) => {
        console.log('client connection: ', data.id);
    });
    const handleClick = () => {
        console.log("btn click");
        socket.emit('client_emit', {sort: 1})
    }
    socket.on('change_lyrics', (data: LyricsData) => {
        setText(data.text);
        setRuby(data.ruby);
    })

    return (
        <>
            <button onClick={handleClick}>点我emit</button>
            <div>Text {text}</div>
            <div>Ruby {ruby}</div>
        </>
    )
}

// class SocketApp extends React.Component {
//     constructor(props: any) {
//         super(props)
//     }
//     static contextType = socketContext;
//     render(): React.ReactNode {
//         const socket = this.context
//         socket.on('firstConnetion', (data: any) => {
//             console.log('client connection: ', socket.id);
//         });
//         return (
//             <>
//                 <div>socket连接page</div>
//             </>
//         )
//     }
// }

export default SocketApp