import React, { useEffect, useState } from 'react';
import { useSocket } from '@/components'

const SocketDisplay = () => {
    const socket = useSocket();
    const TEXT = 'display/text'
    const RUBY = 'display/ruby'
    const [text, setText] = useState<string>(() => {
        let _text: any = ''
        if (typeof(window) !== 'undefined') {
            if (
                localStorage.getItem(TEXT) !== null
                && localStorage.getItem(TEXT) !== ''
            ) {
                _text = localStorage.getItem(TEXT)
            }
            if (
                localStorage.getItem(TEXT) !== null
                && localStorage.getItem(TEXT) !== ''
            ) {
                _text = localStorage.getItem(TEXT)
            }
        }
        return _text
    })
    const [ruby, setRuby] = useState<string>(() => {
        let _ruby: any = ''
        if (typeof(window) !== 'undefined') {
            if (
                localStorage.getItem(RUBY) !== null
                && localStorage.getItem(RUBY) !== ''
            ) {
                _ruby = localStorage.getItem(RUBY)
            }
            if (
                localStorage.getItem(RUBY) !== null
                && localStorage.getItem(RUBY) !== ''
            ) {
                _ruby = localStorage.getItem(RUBY)
            }
        }
        return _ruby
    })

    useEffect(() => {
        socket.on('change_lyrics', (data) => {
            setText(data.current.text);
            setRuby(data.current.ruby);
            localStorage.setItem(TEXT, data.current.text)
            localStorage.setItem(RUBY, data.current.ruby)
        })
    }, [socket])

    return (
        <>
            <div className='text-center font-semibold text-lg'>{ruby}</div>
            <div className='text-center font-semibold text-2xl'>{text}</div>
        </>
    )
}

export default SocketDisplay