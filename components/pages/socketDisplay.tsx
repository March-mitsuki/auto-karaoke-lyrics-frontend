import React, { useEffect, useState, useRef } from 'react'
import { useSocket } from '@/components'
import type * as CSS from 'csstype'

const SocketDisplay = () => {
  const socket = useSocket()
  const hasInitialized = useRef(false)

  const TEXT = 'display/text'
  const RUBY = 'display/ruby'

  const [text, setText] = useState<string>(() => {
    let _text: any = ''
    if (typeof window !== 'undefined') {
      if (localStorage.getItem(TEXT) !== null && localStorage.getItem(TEXT) !== '') {
        _text = localStorage.getItem(TEXT)
      }
      if (localStorage.getItem(TEXT) !== null && localStorage.getItem(TEXT) !== '') {
        _text = localStorage.getItem(TEXT)
      }
    }
    return _text
  })
  const [ruby, setRuby] = useState<string>(() => {
    let _ruby: any = ''
    if (typeof window !== 'undefined') {
      if (localStorage.getItem(RUBY) !== null && localStorage.getItem(RUBY) !== '') {
        _ruby = localStorage.getItem(RUBY)
      }
      if (localStorage.getItem(RUBY) !== null && localStorage.getItem(RUBY) !== '') {
        _ruby = localStorage.getItem(RUBY)
      }
    }
    return _ruby
  })

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
    order: boolean // true -> text在下面, false -> ruby在下面
  }>({
    text: textStyleDefault,
    ruby: rubyStyleDefault,
    order: false,
  })

  useEffect(() => {
    if (hasInitialized.current) {
      return
    }
    hasInitialized.current = true

    socket.on('change_lyrics', (data) => {
      setText(data.current.text)
      setRuby(data.current.ruby)
      localStorage.setItem(TEXT, data.current.text)
      localStorage.setItem(RUBY, data.current.ruby)
    })
    socket.on('change_style', (data) => {
      console.log('style change!', data)
      try {
        setStyle({
          text: data.text,
          ruby: data.ruby,
          order: data.order,
        })
      } catch (err) {
        console.log('style parser error, please check it')
        console.log('err msg:', err)
      }
    })
  }, [socket])

  if (!style.order) {
    return (
      <>
        <div style={style.ruby}>{ruby}</div>
        <div style={style.text}>{text}</div>
      </>
    )
  } else {
    return (
      <>
        <div style={style.text}>{text}</div>
        <div style={style.ruby}>{ruby}</div>
      </>
    )
  }
}

export default SocketDisplay
