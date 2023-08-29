import io from "socket.io-client"
const socket = io("localhost:5001", {
	transports: ['websocket'],
	upgrade: false
})
socket.connect()
export default socket