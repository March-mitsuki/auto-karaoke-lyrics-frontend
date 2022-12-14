import { Socket } from 'socket.io-client'
import type * as CSS from 'csstype'
import { type } from 'os'

export type socketContextData = {
    socket: Socket,
    setUsername: Function,
    messages?: {
        message: string,
        username: string,
        time: string
    }[],
    setMessages: Function
}

// server的Setlist(tyoeORM的实体)
export interface Setlist {
    id: number,
    sort: number,
    text: string,
    ruby: string,
    memo: string
}
// 前端实际使用的SetlistData
export interface SetlistData extends Setlist {
    isSended?: boolean,
    isEditing?: boolean,
}
export type DisplayStyleData = {
    text: CSS.Properties,
    ruby: CSS.Properties,
    order: boolean // true -> text在下面, false -> ruby在下面
}

// 试着按照socketio的官方文档写了写, 先声明定义不export的type
type AddAssData = {
    sort: string | number,
    memo: string,
    type: 'N-return' | 'speaker-instead' | 'nomal' | string,
    ass_data: string | unknown
}

// server.emit, client.on
export type ServerToClientEvents = {
    // 发送setlist
    setlist_response: (data: Setlist[]) => void;

    // 每次更新字幕
    change_lyrics: (data: {
        current: {
            text: string, ruby: string
        },
        before: {
            text: string, ruby: string
        },
        next: {
            text: string, ruby: string
        },
        stat: 0 | 1 | 2 | 3 // 0 -> 最开始的一条, 1 -> 途中, 2 -> 最后一条, 3 -> 暂停
    }) => void;

    // 告知client删除字幕的返回状态
    delete_lyrics_info: (data: { stat: boolean, sort: number }) => void;

    // 通知客户端更改display-style
    change_style: (data: DisplayStyleData) => void;
}

// client.emit, server.on
export type ClientToServerEvents = {
    // 开始播放
    send_lyrics: (data: {sort: number}) => void;

    // 停止播放
    stop_play: (data: 0 | 1) => void;

    // 上传ass添加字幕
    add_ass: (data: AddAssData) => void;

    // 真删除该sort的字幕
    delete_lyrics: (data: { sort: string | number }) => void;

    // 校准下一行时间(直接开始下一行)
    correct_lyrics: (data: { sort: string | number }) => void;

    // 往后校准时间(退回上一行开始)
    correct_back: (data: { sort: string | number }) => void;

    // 退回上上行开始
    correct_back_two: (data: { sort: string | number }) => void;

    // 暂停当前行
    pause_lyrics: (data: { sort: string | number }) => void;

    // 发送空白(不清除timeout)
    send_blank: (data: { sort: string | number }) => void;    

    // 客户端请求刷新setlist
    reload_setlist: () => void;

    // 客户端请求更新display-style
    req_change_style: (data: DisplayStyleData) => void;

    // 请求更新对应sort的memo
    update_memo: (data: {sort: string | number, memo: string}) => void;
}