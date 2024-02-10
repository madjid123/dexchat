import io from "socket.io-client"
import API_URL from "~/URL"
const socket = io(API_URL, {
	transports: ['websocket'],
	upgrade: false
})
socket.connect()
export default socket