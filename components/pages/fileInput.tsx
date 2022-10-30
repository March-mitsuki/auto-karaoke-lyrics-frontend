import React, { useState } from 'react'
import { basicInputStyle, btnOrangeStyle } from '@/styles/styleStr'

import type { Socket } from 'socket.io-client'

const popFileSelector = () => {
  return new Promise((resolve, reject) => {
    try {
      let input = document.createElement('input')
      input.value = '选择文件'
      input.type = 'file'
      input.onchange = (event: any) => {
        let file = event.target.files[0]
        let file_reader = new FileReader()
        file_reader.onload = () => {
          let data = file_reader.result
          resolve(data) // 返回文件文本内容到Promise
        }
        file_reader.readAsText(file, 'UTF-8')
      }
      input.click()
    } catch (err) {
      reject(`popFileSelector error: ${err}`)
    }
  })
}

const FileInput: React.FC<{ws: Socket}> = (props) => {
  const socket = props.ws
  const [sort, setSort] = useState('')
  const [memo, setMemo] = useState('')
  const [type, setType] = useState('speaker-instead')

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
        ass_data: ass_data,
      })
      window.location.reload()
      // socket.emit('reload_setlist')
    } catch (err) {
      console.log('emit add_ass err:', err)
    }
  }

  return (
    <>
      <label htmlFor='lyrics-sort' className='flex'>
        请输入sort
        <div className='pl-1'>
          <input
            type='number'
            id='lyrics-sort'
            value={sort}
            onChange={sortChangeHandler}
            className={basicInputStyle}
            autoComplete='off'
            placeholder='sort不可重复'
          />
        </div>
      </label>
      <label htmlFor='lyrics-type' className='flex'>
        请选择上传ass的类型
        <div className='pl-1'>
          <select
            id='lyrics-type'
            value={type}
            onChange={typeChangeHandler}
            className='px-2 border-2 border-gray-300 rounded-lg'
          >
            <option value='speaker-instead'>说话人代替</option>
            <option value='N-return'>\N分割</option>
            <option value='nomal'>普通MC（不需要双语）</option>
          </select>
        </div>
      </label>
      <label htmlFor='lyrics-memo' className='flex'>
        请输入memo
        <div className='pl-1'>
          <input
            type='text'
            id='lyrics-memo'
            value={memo}
            onChange={memoChangeHandler}
            className={basicInputStyle}
            autoComplete='off'
            placeholder='提醒你这个ass是什么'
          />
        </div>
      </label>
      <button onClick={clickHandler} className={btnOrangeStyle}>
        选择ass并提交
      </button>
    </>
  )
}

export default FileInput
