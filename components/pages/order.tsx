import { useEffect, useState, useRef } from 'react';
import { useSocket } from '../socket'
import type { SetlistData } from '@/interfaces/socketDataTypes';
import { orderBtnStyle } from '@/styles/styleStr';


const OrderCompo = () => {
    const socket = useSocket()
    const hasInitialized = useRef(false);
    const [setlist, setSetlist] = useState<SetlistData[]>([{
        id: -1,
        sort: -1,
        text: 'NULL',
        ruby: 'null',
        memo: 'connecting to server...'
    }])
    const [isPlay, setIsPlay] = useState<boolean>(false)

    useEffect(() => {
        if (hasInitialized.current) {
            return;
        }
        hasInitialized.current = true
        socket.on('connect', () => {
            console.log('client connect');
            socket.emit('reload_setlist');
        })
        
        socket.on('setlist_response', (data) => {
            console.log('on setlist_response');
            setSetlist(data)
        });

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
    }, [socket, setlist])

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
                        setIsPlay(true)
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
                        console.log('play ->', elem.sort);
                        socket.emit('send_lyrics', {sort: elem.sort})
                    }}
                    className={orderBtnStyle}
                >重新开始</button>
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
                        setIsPlay(false)
                    }}
                    className={orderBtnStyle}
                >停止</button>
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

    if (isPlay) {
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

export default OrderCompo