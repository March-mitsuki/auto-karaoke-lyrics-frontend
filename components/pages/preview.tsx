import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../socket'


const sideRubyStyle = 'text-sm truncate'
const sideTextStyle = 'text-xl truncate'
const sidePreviewStyle = 'rounded-lg text-center bg-gray-300 px-10 py-2 my-5 min-w-[300px] max-w-[300px] min-h-[60px] max-h-[60px]'


const Preview = () => {
    const socket = useSocket()
    const hasInitialized = useRef(false);
    const [current, setCurrent] = useState({text: '尚未开始播放', ruby: '当前歌词'});
    const [before, setBefore] = useState({text: '尚未开始', ruby: '上一句'});
    const [next, setNext] = useState({text: '尚未开始', ruby: '下一句'});

    useEffect(() => {
        if (hasInitialized.current) {
            return;
        }
        hasInitialized.current = true
        socket.on('change_lyrics', (data) => {
            console.log('on change_lyrics');
            setCurrent({text: data.current.text, ruby: data.current.ruby});
            setBefore({text: data.before.text, ruby: data.before.ruby});
            setNext({text: data.next.text, ruby: data.next.ruby});
        })
    }, [socket])

    return (
        <>
            <div className={sidePreviewStyle}>
                <p className={sideRubyStyle}>{before.ruby}</p>
                <p className={sideTextStyle}>{before.text}</p>
            </div>
            <div className='rounded-lg text-center flex-1 bg-red-400 mx-10 py-5 min-w-[500px] min-h-[104px] max-h-[104px]'>
                <p className='text-base truncate text-white'>{current.ruby}</p>
                <p className='text-2xl truncate text-white'>{current.text}</p>
            </div>
            <div className={sidePreviewStyle}>
                <p className={sideRubyStyle}>{next.ruby}</p>
                <p className={sideTextStyle}>{next.text}</p>
            </div>
        </>
    )
}

export default Preview