import { io } from "socket.io-client"

export const socket = io("localhost:5001", { transports: ['websocket'] })
socket.connect()
socket.on("connect", () => {

})