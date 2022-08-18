import { useState } from 'react';
import { useSocket } from '../socket'
import type { SetlistData } from '@/interfaces/socketDataTypes';
import { orderBtnStyle } from '@/styles/styleStr';


const OrderCompo = () => {
    const socket = useSocket()
    const [setlist, setSetlist] = useState<SetlistData[]>([{
        id: -1,
        sort: -1,
        text: 'NULL',
        ruby: 'null',
        memo: 'connecting to server...'
    }])

    socket.on('reload_setlist', (data) => {
        setSetlist(data)
    });

    // 不知道为什么在这里设置setSetlist不行
    // 甚至这个函数直接就不会被在client里执行
    // log都不会被打印出来, run dev的情况下会在服务器里被打印出来
    // 上面一模一样的代码就工作的挺好的,我不知道是我的问题还是react的问题还是nextjs的问题
    socket.on('delete_lyrics_info', (data) => {
        console.log('clien on delete_lyrics_info!!');
        if (data.stat === true) {
            console.log("delete_lyrics success");
            // setSetlist(data.setlist)
        } else {
            console.log('delete_lyrics false');
        }
    })

    const renderSetlist: React.ReactNode = setlist.map((elem) => 
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

    return (
        <ul>
            {renderSetlist}
        </ul>
    )
}

export default OrderCompo