import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../socket'


const sideRubyStyle = 'text-sm truncate'
const sideTextStyle = 'text-xl truncate'
const sidePreviewStyle = 'rounded-lg text-center bg-gray-300 px-10 py-2 my-5 min-w-[300px] max-w-[300px] min-h-[60px] max-h-[60px]'


const Preview = () => {
    const socket = useSocket();
    const hasInitialized = useRef(false);

    const CURRENT_TEXT = 'operation/preview/current_text';
    const CURRENT_RUBY = 'operation/preview/current_ruby';

    const BEFORE_TEXT = 'operation/preview/before_text';
    const BEFORE_RUBY = 'operation/preview/before_ruby';

    const NEXT_TEXT = 'operation/preview/next_text';
    const NEXT_RUBY = 'operation/preview/next_ruby';

    const [current, setCurrent] = useState<{
        text: string,
        ruby: string
    }>(() => {
        let _current: {
            text: any,
            ruby: any
        } = {
            text: '尚未开始播放',
            ruby: '当前歌词'
        }
        if (typeof(window) !== 'undefined') {
            if (
                localStorage.getItem(CURRENT_TEXT) !== null
                && localStorage.getItem(CURRENT_TEXT) !== ''
            ) {
                _current.text = localStorage.getItem(CURRENT_TEXT)
            }
            if (
                localStorage.getItem(CURRENT_RUBY) !== null
                && localStorage.getItem(CURRENT_RUBY) !== ''
            ) {
                _current.ruby = localStorage.getItem(CURRENT_RUBY)
            }
        }
        console.log('return _current: ', _current);
        return _current
    });

    const [before, setBefore] = useState<{
        text: string,
        ruby: string
    }>(() => {
        let _before: {
            text: any,
            ruby: any
        } = {
            text: '尚未开始',
            ruby: '上一句'
        }
        if (typeof(window) !== 'undefined') {
            if(
                localStorage.getItem(BEFORE_TEXT) !== null
                && localStorage.getItem(BEFORE_TEXT) !== ''
            ){
                _before.text = localStorage.getItem(BEFORE_TEXT)
            }
            if(
                localStorage.getItem(BEFORE_RUBY) !== null
                && localStorage.getItem(BEFORE_RUBY) !== ''
            ){
                _before.ruby = localStorage.getItem(BEFORE_RUBY)
            }
        }
        return _before
    });

    const [next, setNext] = useState<{
        text: string,
        ruby: string
    }>(() => {
        let _next: {
            text: any,
            ruby: any
        } = {
            text: '尚未开始',
            ruby: '下一句'
        }
        if (typeof(window) !== 'undefined') {
            if (
                localStorage.getItem(NEXT_TEXT) !== null
                && localStorage.getItem(NEXT_TEXT) !== ''
            ) {
                _next.text = localStorage.getItem(NEXT_TEXT)
            }
            if (
                localStorage.getItem(NEXT_RUBY) !== null
                && localStorage.getItem(NEXT_RUBY) !== ''
            ) {
                _next.ruby = localStorage.getItem(NEXT_RUBY)
            }
        }
        return _next
    });

    useEffect(() => {
        if (hasInitialized.current) {
            return;
        }
        hasInitialized.current = true
        socket.on('change_lyrics', (data) => {
            console.log('on change_lyrics');
            if (data.current.text === '' && data.stat === 2) {
                localStorage.clear()
                setCurrent({text: '歌曲结束', ruby: '歌曲结束'});
            } else if(data.current.text === '') {
                setCurrent({text: '***', ruby: '***'});
                localStorage.setItem(CURRENT_TEXT, '***');
                localStorage.setItem(CURRENT_RUBY, '***');
            } else {
                setCurrent({text: data.current.text, ruby: data.current.ruby});
                localStorage.setItem(CURRENT_TEXT, data.current.text);
                localStorage.setItem(CURRENT_RUBY, data.current.ruby);
            }

            if (data.before.text === '' && data.stat === 2) {
                setBefore({text: '***', ruby: '***'});
            } else if (data.before.text === '') {
                setBefore({text: '***', ruby: '***'});
                localStorage.setItem(BEFORE_TEXT, '***');
                localStorage.setItem(BEFORE_RUBY, '***');
            } else {
                setBefore({text: data.before.text, ruby: data.before.ruby});
                localStorage.setItem(BEFORE_TEXT, data.before.text);
                localStorage.setItem(BEFORE_RUBY, data.before.ruby);
            }

            if (data.next.text === '' && data.stat === 2) {
                setNext({text: '***', ruby: '***'});
            } else if (data.next.text === '') {
                setNext({text: '***', ruby: '***'});
                localStorage.setItem(NEXT_TEXT, '***');
                localStorage.setItem(NEXT_RUBY, '***');
            } else {
                setNext({text: data.next.text, ruby: data.next.ruby});
                localStorage.setItem(NEXT_TEXT, data.next.text);
                localStorage.setItem(NEXT_RUBY, data.next.ruby);
            }
        })
    }, [socket, current, before, next])

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