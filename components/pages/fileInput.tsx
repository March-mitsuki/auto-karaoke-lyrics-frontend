import React, { useState } from 'react';
import { useSocket } from '../socket';
import { onelineInputStyle, orderBtnStyle } from '@/styles/styleStr';

export const popFileSelector = () => {
    return new Promise((resolve, reject) => {
        try {
            let input = document.createElement('input');
            input.value = '选择文件';
            input.type = 'file';
            input.onchange = (event: any) => {
                let file = event.target.files[0];
                let file_reader = new FileReader();
                file_reader.onload = () => {
                    let data = file_reader.result;
                    resolve(data); // 返回文件文本内容到Promise
                };
                file_reader.readAsText(file, 'UTF-8');
            };
            input.click();
        } catch (err) {
            reject(`popFileSelector error: ${err}`)
        }
    });
}

const FileInput = () => {
    const socket = useSocket();
    const [sort, setSort] = useState('');
    const [memo, setMemo] = useState('');
    const [type ,setType] = useState('speaker-instead');

    const sortChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSort(event.target.value)
    }
    const memoChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMemo(event.target.value)
    }
    const typeChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value)
    }


    const clickHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            const ass_data = await popFileSelector()
            socket.emit('add_ass', {
                sort: sort,
                memo: memo,
                type: type,
                ass_data: ass_data
            })
            window.location.reload()
            // socket.emit('reload_setlist')
        } catch (err) {
            console.log('emit add_ass err:', err)
        }
    }

    return (
        <>
            <label htmlFor='lyrics-sort'>请输入sort</label>
            <input
                type='number'
                id='lyrics-sort'
                onChange={sortChangeHandler}
                className={onelineInputStyle}
                autoComplete='off'
                placeholder='sort不可重复'
            />
            <label htmlFor='lyrics-type'>请选择上传ass的类型</label>
            <select id='lyrics-type' value={type} onChange={typeChangeHandler} className='px-2 mr-2 border-2 border-gray-300 rounded-lg' >
                <option value='speaker-instead'>说话人代替</option>
                <option value='N-return'>\N分割</option>
                <option value='nomal'>普通MC（不需要双语）</option>
            </select>
            <label htmlFor='lyrics-memo'>请输入memo</label>
            <input
                type='text'
                id='lyrics-memo'
                onChange={memoChangeHandler}
                className={onelineInputStyle}
                autoComplete='off'
                placeholder='提醒你这个ass是什么'
            />
            <button onClick={clickHandler} className='bg-orange-400 hover:bg-orange-600 rounded-full px-3 border-2 border-gray-300 text-white'>
                选择ass并提交
            </button>
            <button 
                onClick={() => {
                    socket.emit('reload_setlist')
                }}
                className={orderBtnStyle}
            >
                刷新Setlist
            </button>
            <button
                onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                }}
                className={orderBtnStyle}
            >
                初始化preview
            </button>
        </>
    )
}

export default FileInput