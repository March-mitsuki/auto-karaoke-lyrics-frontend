import { useEffect, useState, useRef } from 'react';
import { useSocket } from '../socket'
import type { SetlistData } from '@/interfaces/socketDataTypes';
import {
    btnBlueStyle,
    btnOrangeStyle,
    btnRedStyle
} from '@/styles/styleStr';

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
        <li key={elem.id} className=''>
            <div className='flex gap-5 mb-2 px-5 py-1 border-2 rounded-full border-gray-300'>
                <div className='flex-auto'>{elem.sort}</div>
                <div className='flex-auto'>{elem.text}</div>
                <div className='flex-auto'>{elem.ruby}</div>
                <div className='text-sm'>{elem.memo}</div>
                <button
                    onClick={() => {
                        console.log('play ->', elem.sort);
                        socket.emit('send_lyrics', {sort: elem.sort})
                    }}
                    className={btnBlueStyle}
                >开始</button>
                <button
                    onClick={() => {
                        console.log('delete ->', elem.sort);
                        socket.emit('delete_lyrics', {sort: elem.sort})
                        setSetlist(setlist.filter(x => x.sort !== elem.sort))
                    }}
                    className={btnRedStyle}
                >删除</button>
            </div>
        </li>
    )

    const playingOperation: React.ReactNode = setlist.map((elem) => 
        <li key={elem.id} >
            <div className='flex gap-5 mb-2 px-5 py-1 border-2 rounded-full border-gray-300'>
                <div className='flex-auto'>{elem.sort}</div>
                <div className='flex-auto'>{elem.text}</div>
                <div className='flex-auto'>{elem.ruby}</div>
                <div className='text-sm'>{elem.memo}</div>
                <button
                    onClick={() => {
                        console.log('send blank ->', elem.sort);
                        socket.emit('send_blank', { sort: elem.sort })

                    }}
                    className={btnBlueStyle}
                >发送</button>
                <button
                    onClick={() => {
                        console.log('pause ->', elem.sort);
                        socket.emit('pause_lyrics', { sort: elem.sort })
                    }}
                    className={btnBlueStyle}
                >暂停</button>
                <button
                    onClick={() => {
                        console.log('correct ->', elem.sort);
                        socket.emit('correct_lyrics', { sort: elem.sort })
                    }}
                    className={btnBlueStyle}
                >校准</button>
                <button
                    onClick={() => {
                        console.log('correct_back ->', elem.sort);
                        socket.emit('correct_back', { sort: elem.sort })
                    }}
                    className={btnBlueStyle}
                >后退</button>
                <button
                    onClick={() => {
                        console.log('correct back two ->', elem.sort);
                        socket.emit('correct_back_two', { sort: elem.sort })
                    }}
                    className={btnBlueStyle}
                >后后退</button>
                <button
                    onClick={() => {
                        console.log('stop ->', elem.sort);
                        socket.emit('stop_play', 1)
                    }}
                    className={btnOrangeStyle}
                >停止</button>
            </div>
        </li>
    )

    if (setlist.length === 0) {
        return (
            <div className='text-center px-5 py-1 border-2 rounded-full border-gray-300'>
                人家里面还什么都没有哦...要不要试试上传一个ass塞满人家?
            </div>
        )
    } else {
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
}

export default CommandCompo