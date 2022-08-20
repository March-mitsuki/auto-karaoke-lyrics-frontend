import { useEffect, useState, useRef } from 'react';
import { useSocket } from '../socket'
import type { SetlistData } from '@/interfaces/socketDataTypes';
import { orderBtnStyle } from '@/styles/styleStr';

// interface CustomStorage<T> extends Storage {
//     getItem(key: ): string | null
// }


const CommandCompo = () => {
    const socket = useSocket();
    const hasInitialized = useRef(false);
    const IS_PLAY_STATE = 'operation/command/isplay'

    const [setlist, setSetlist] = useState<SetlistData[]>([{
        id: -1,
        sort: -1,
        text: 'NULL',
        ruby: 'null',
        memo: 'connecting to server...'
    }])
    const [isPlay, setIsPlay] = useState<'true' | 'false'>(() => {
        if (typeof(window) !== 'undefined') {
            if (
                localStorage.getItem(IS_PLAY_STATE) !== null
                && localStorage.getItem(IS_PLAY_STATE) !== ''
            ) {
                const _isPlay: any = localStorage.getItem(IS_PLAY_STATE)
                return _isPlay;
            }
        }
        return 'false'
    })

    useEffect(() => {
        if (hasInitialized.current) {
            return;
        }
        hasInitialized.current = true
        socket.on('connect', () => {
            console.log('client connect');
            socket.emit('reload_setlist');
        });
        socket.on('setlist_response', (data) => {
            console.log('on setlist_response');
            setSetlist(data)
        });

        socket.on("change_lyrics", (data) => {
            if (
                data.stat === 0
                && typeof(window) !== 'undefined'
            ) {
                setIsPlay('true')
                localStorage.setItem(IS_PLAY_STATE, 'true')
            } else if (
                data.stat === 2
                && typeof(window) !== 'undefined'
            ) {
                setIsPlay('false')
                localStorage.setItem(IS_PLAY_STATE, 'false')
            } else if (
                isPlay === 'false'
                && data.stat === 1
                && typeof(window) !== 'undefined'
            ) {
                setIsPlay('true')
                localStorage.setItem(IS_PLAY_STATE, 'true')
            }
        })

        // 这里读不到setlist的值, 不知道为什么
        // socket.on('delete_lyrics_info', (data) => {
        //     console.log('clien on delete_lyrics_info!!');
        //     if (data.stat === true) {
        //         console.log("delete_lyrics success");
        //         console.log(setlist);
        //         setSetlist(setlist.filter(x => x.sort !== data.sort))
        //     } else {
        //         console.log('delete_lyrics false');
        //     }
        // })
    }, [socket, isPlay])

    const pauseOrperation: React.ReactNode = setlist.map((elem) => 
        <li key={elem.id}>
            <div className='flex border-2 rounded-full border-gray-300 mb-3'>
                <div className='flex-auto ml-10 mr-5 my-2'>{elem.sort}</div>
                <div className='flex-auto mx-5 my-2'>{elem.text}</div>
                <div className='flex-auto mx-5 my-2'>{elem.ruby}</div>
                <div className='text-sm ml-2 mr-5 my-2'>{elem.memo}</div>
                <button
                    onClick={() => {
                        console.log('play ->', elem.sort);
                        socket.emit('send_lyrics', {sort: elem.sort})
                    }}
                    className={orderBtnStyle}
                >开始</button>
                <button
                    onClick={() => {
                        console.log('delete ->', elem.sort);
                        socket.emit('delete_lyrics', {sort: elem.sort})
                        setSetlist(setlist.filter(x => x.sort !== elem.sort))
                    }}
                    className='bg-red-500 hover:bg-red-700 rounded-full px-3 border-2 border-gray-300 text-white my-1 mx-3'
                >删除</button>
            </div>
        </li>
    )

    const playingOperation: React.ReactNode = setlist.map((elem) => 
        <li key={elem.id}>
            <div className='flex border-2 rounded-full border-gray-300 mb-3'>
                <div className='flex-auto ml-10 mr-5 my-2'>{elem.sort}</div>
                <div className='flex-auto mx-5 my-2'>{elem.text}</div>
                <div className='flex-auto mx-5 my-2'>{elem.ruby}</div>
                <div className='text-sm ml-2 mr-5 my-2'>{elem.memo}</div>
                <button
                    onClick={() => {
                        console.log('correct ->', elem.sort);
                        socket.emit('correct_lyrics', { sort: elem.sort })
                    }}
                    className={orderBtnStyle}
                >校准下句</button>
                <button
                    onClick={() => {
                        console.log('correct_lyrics_back ->', elem.sort);
                        socket.emit('correct_lyrics_back', { sort: elem.sort })
                    }}
                    className={orderBtnStyle}
                >后退校准</button>
                <button
                    onClick={() => {
                        console.log('stop ->', elem.sort);
                        socket.emit('stop_play', 1)
                    }}
                    className='bg-orange-500 hover:bg-orange-700 rounded-full px-3 border-2 border-gray-300 text-white my-1 mx-3'
                >停止</button>
            </div>
        </li>
    )

    if (isPlay === 'true') {
        return (
            <ul>
                {playingOperation}
            </ul>
        )
    } else {
        return (
            <ul>
                {pauseOrperation}
            </ul>
        )
    }
}

export default CommandCompo