import { useState } from 'react';
import { useSocket } from '../socket'
import type { SetlistData } from '@/interfaces/socketDataTypes';
import { orderBtnStyle } from '@/styles/styleStr';

const orderInfoStyle = ''

const OrderCompo = () => {
    const socket = useSocket()
    const [setlist, setSetlist] = useState<SetlistData[]>([{
        id: -1,
        sort: -1,
        text: 'NULL',
        memo: 'connecting to server...'
    }])

    socket.on('first_connetion', (data: SetlistData[]) => {
        setSetlist(data)
    });

    const renderSetlist: React.ReactNode = setlist.map((elem) => 
        <li key={elem.id}>
            <div className='flex border-2 rounded-full border-gray-300 mb-3'>
                <div className='flex-auto ml-10 mr-5 my-2'>{elem.sort}</div>
                <div className='flex-auto mx-5 my-2'>{elem.text}</div>
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
                        console.log('stop ->', elem.sort);
                        socket.emit('stop_play', 1)
                    }}
                    className={orderBtnStyle}
                >停止</button>
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