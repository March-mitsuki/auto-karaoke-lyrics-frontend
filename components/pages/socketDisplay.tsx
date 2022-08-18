import React, { useState } from 'react';
import { useSocket } from '@/components'
import type { LyricsData } from '@/interfaces/socketDataTypes';

const SocketDisplay = () => {
    const socket = useSocket();
    const [text, setText] = useState('')
    const [ruby, setRuby] = useState('')

    socket.on('change_lyrics', (data: LyricsData) => {
        setText(data.text);
        setRuby(data.ruby);
    })

    return (
        <>
            <div className='text-center font-semibold text-lg'>{ruby}</div>
            <div className='text-center font-semibold text-2xl'>{text}</div>
        </>
    )
}

export default SocketDisplay