import { btnBlueStyle, btnRedStyle } from '@/styles/styleStr'
import { STYLE_ORDER, STYLE_RUBY, STYLE_TEXT } from './displayStyleChanger'
import {
  BEFORE_RUBY,
  BEFORE_TEXT,
  CURRENT_RUBY,
  CURRENT_TEXT,
  NEXT_RUBY,
  NEXT_TEXT,
} from './preview'

import type { Socket } from 'socket.io-client'

const PageControlBtn: React.FC<{ ws: Socket }> = (props) => {
  const socket = props.ws
  return (
    <>
      <button
        onClick={() => {
          socket.emit('reload_setlist')
        }}
        className={btnBlueStyle}
      >
        刷新Setlist
      </button>
      <button
        onClick={() => {
          localStorage.removeItem(CURRENT_TEXT)
          localStorage.removeItem(CURRENT_RUBY)
          localStorage.removeItem(BEFORE_TEXT)
          localStorage.removeItem(BEFORE_RUBY)
          localStorage.removeItem(NEXT_TEXT)
          localStorage.removeItem(NEXT_RUBY)
          window.location.reload()
        }}
        className={btnRedStyle}
      >
        初始化preview
      </button>
      <button
        onClick={() => {
          localStorage.removeItem(STYLE_TEXT)
          localStorage.removeItem(STYLE_RUBY)
          localStorage.removeItem(STYLE_ORDER)
          window.location.reload()
        }}
        className={btnRedStyle}
      >
        初始化样式
      </button>
    </>
  )
}

export default PageControlBtn
