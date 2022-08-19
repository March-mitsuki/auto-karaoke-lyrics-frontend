import React, { useState } from 'react';
import { useSocket } from '@/components'

const SocketDisplay = () => {
    const socket = useSocket();
    const [text, setText] = useState('')
    const [ruby, setRuby] = useState('')

    socket.on('change_lyrics', (data) => {
        setText(data.current.text);
        setRuby(data.current.ruby);
    })

    return (
        <>
            <div className='text-center font-semibold text-lg'>{ruby}</div>
            <div className='text-center font-semibold text-2xl'>{text}</div>
        </>
    )
}

export default SocketDisplay