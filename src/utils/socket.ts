import io from "socket.io-client"
import API_URL from "~/URL"
const socket = io(API_URL + ":5001", {
	transports: ['websocket'],
	upgrade: false
})
socket.connect()
export default socket