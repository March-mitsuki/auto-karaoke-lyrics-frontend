import { Socket } from 'socket.io-client'

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

export type LyricsData = {
    text: string,
    ruby: string
}

// server的Setlist(tyoeORM的实体)
export type SetlistData = {
    id: number,
    sort: number,
    text: string,
    ruby: string,
    memo: string
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
    reload_setlist: (data: SetlistData[]) => void;

    // 每次更新字幕
    change_lyrics: (data: { text: string, ruby: string }) => void;

    // 告知client删除字幕的返回状态
    delete_lyrics_info: (data: { stat: boolean, setlist: SetlistData[] | [] }) => void;
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

    // 校准时间
    correct_lyrics: (data: { sort: string | number }) => void;

    // 往后校准时间
    correct_lyrics_back: (data: { sort: string | number }) => void;
}