import io from 'socket.io-client';
const API_URL = import.meta.env.VITE_API_URL;

const socket = io(API_URL, {
  transports: ['websocket'],
  upgrade: false,
  autoConnect : true,
  query : {
    token : localStorage.getItem('token') || ""
  }
});
socket.connect();

export default socket;
