import React, { useState } from 'react';
import { useSocket } from '../socket';
import { onelineInputStyle } from '@/styles/styleStr';

export const popFileSelector = () => {
    return new Promise((resolve, reject) => {
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
    });
}

const FileInput = () => {
    const socket = useSocket();
    const [sort, setSort] = useState('');
    const [memo, setMemo] = useState('');

    const sortChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSort(event.target.value)
    }
    const memoChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMemo(event.target.value)
    }


    const clickHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            const ass_data = await popFileSelector()
            console.log('pop file selector:', ass_data);
            console.log('sort state: ', sort);
            socket.emit('add_ass', {
                sort: sort,
                memo: memo,
                ass_data: ass_data
            })
        } catch (err) {
            console.log('emit add_ass err:', err)
        }
    }

    return (
        <>
            <label htmlFor="lyrics-sort">请输入sort</label>
            <input type='number' id='lyrics-sort' onChange={sortChangeHandler} className={onelineInputStyle} />
            <label htmlFor="lyrics-memo">请输入memo</label>
            <input type="text" id='lyrics-memo' onChange={memoChangeHandler} className={onelineInputStyle} />
            <button onClick={clickHandler} className='bg-orange-400 hover:bg-orange-600 rounded-full px-3 border-2 border-gray-300 text-white'>选择ass并提交</button>
        </>
    )
}

export default FileInput