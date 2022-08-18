import { Socket } from "socket.io-client"

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

export type SetlistData = {
    id: number,
    sort: number,
    text: string,
    memo: string
}