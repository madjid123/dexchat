import io from "socket.io-client"
const socket = io("localhost:5001", {
	transports: ['websocket']
})
socket.connect()
export default socket