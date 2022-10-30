import React, { useState } from 'react'
import { basicInputStyle, btnOrangeStyle } from '@/styles/styleStr'
import { useSocket } from '../socket'
import type * as CSS from 'csstype'

export const STYLE_TEXT = 'operation/style/text'
export const STYLE_RUBY = 'operation/style/ruby'
export const STYLE_ORDER = 'operation/style/order'

const DisplayStyleChanger = () => {
  const socket = useSocket()

  const textStyleDefault: CSS.Properties = {
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: 'bold',
  }
  const rubyStyleDefault: CSS.Properties = {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
  }
  const [style, setStyle] = useState<{
    text: CSS.Properties
    ruby: CSS.Properties
    order: boolean // false -> text在下面, true -> ruby在下面
  }>(() => {
    let _textStyle = textStyleDefault
    let _rubyStyle = rubyStyleDefault
    let _style = {
      text: _textStyle,
      ruby: _rubyStyle,
      order: false,
    }
    if (typeof window !== 'undefined') {
      const textStyleStr = localStorage.getItem(STYLE_TEXT)
      const rubyStyleStr = localStorage.getItem(STYLE_RUBY)
      const orderStr = localStorage.getItem(STYLE_ORDER)

      if (textStyleStr && textStyleStr !== '') {
        _style.text = JSON.parse(textStyleStr)
      }
      if (rubyStyleStr && rubyStyleStr !== '') {
        _style.ruby = JSON.parse(rubyStyleStr)
      }
      if (orderStr && orderStr !== '') {
        _style.order = JSON.parse(orderStr)
      }
    }
    return _style
  })

  const [previewStyle, setPreviewStyle] = useState<{
    text: string
    ruby: string
  }>(() => {
    let _textStyle = JSON.stringify(textStyleDefault, null, 2)
    let _rubyStyle = JSON.stringify(rubyStyleDefault, null, 2)
    let _preview = {
      text: _textStyle,
      ruby: _rubyStyle,
    }
    if (typeof window !== 'undefined') {
      const textStyleStr = localStorage.getItem(STYLE_TEXT)
      const rubyStyleStr = localStorage.getItem(STYLE_RUBY)

      if (textStyleStr) {
        // console.log('now in if');
        _preview.text = textStyleStr
      }
      if (rubyStyleStr) {
        _preview.ruby = rubyStyleStr
      }
    }
    // console.log('result:', _preview);

    // preview return了, 但是网页里查看不到
    return _preview
  })

  const [checkSpell, setcheckSpell] = useState<{
    text: boolean
    ruby: boolean
  }>({
    text: true,
    ruby: true,
  })

  const textStyleChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPreviewStyle((preData) => ({ ...preData, text: event.target.value }))
    try {
      const textStyle = JSON.parse(event.target.value)
      setStyle((preData) => ({ ...preData, text: textStyle }))
      localStorage.setItem(STYLE_TEXT, event.target.value)
      setcheckSpell((preData) => ({ ...preData, text: true }))
    } catch (err) {
      setcheckSpell((preData) => ({ ...preData, text: false }))
    }
  }
  const rubyStyleChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPreviewStyle((preData) => ({ ...preData, ruby: event.target.value }))
    try {
      const rubyStyle = JSON.parse(event.target.value)
      setStyle((preData) => ({ ...preData, ruby: rubyStyle }))
      localStorage.setItem(STYLE_RUBY, event.target.value)
      setcheckSpell((preData) => ({ ...preData, ruby: true }))
    } catch (err) {
      setcheckSpell((preData) => ({ ...preData, ruby: false }))
    }
  }
  const orderChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStyle((preData) => ({ ...preData, order: event.target.checked }))
    localStorage.setItem(STYLE_ORDER, JSON.stringify(event.target.checked))
  }

  return (
    <>
      <div className='flex items-center'>
        <label htmlFor='style-text' className='text-center'>
          text
          <br />
          react-inline-css
        </label>
        <div className={checkSpell.text ? 'invisible' : 'px-2'}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='#fb7185'
            strokeWidth='2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <textarea
          id='style-text'
          value={previewStyle.text}
          onChange={textStyleChangeHandler}
          className={basicInputStyle}
          cols={50}
          rows={3}
          autoComplete='off'
          placeholder='请使用react支持的csstype写法'
        />
      </div>
      <div className='flex items-center'>
        <label htmlFor='style-ruby' className='text-center'>
          ruby
          <br />
          react-inline-css
        </label>
        <div className={checkSpell.ruby ? 'invisible' : 'px-2'}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='#fb7185'
            strokeWidth='2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <textarea
          id='style-ruby'
          value={previewStyle.ruby}
          className={basicInputStyle}
          onChange={rubyStyleChangeHandler}
          cols={50}
          rows={3}
          autoComplete='off'
          placeholder='请使用react支持的csstype的写法'
        />
      </div>
      <div className='flex items-center'>
        <label htmlFor='style-order' className='pr-5'>
          交换双语位置
          <input
            type='checkbox'
            id='style-order'
            onChange={orderChangeHandler}
            checked={style.order}
            className=''
          />
        </label>
        <button
          onClick={() => {
            if (checkSpell.text === true && checkSpell.ruby === true) {
              socket.emit('req_change_style', style)
            } else {
              console.log('语法不正确, 无法更改样式')
            }
          }}
          className={btnOrangeStyle}
        >
          变更样式
        </button>
      </div>
    </>
  )
}

export default DisplayStyleChanger
