import e from 'cors';
import { React, useState } from 'react';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client'

var socket = io("localhost:5001", { transports: ['websocket'] })
socket.connect()
function Conversation(props) {

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    socket.emit('sendusr', { me: props.me })
    socket.once("getmsg", (data) => {
        console.log(data)
        const msgs = messages
        msgs.push({ sender: data.username, message: data.message })
        setMessages(msgs)
    })
    const onMessage = () => {
        if (message === '') return;
        console.log(props.user.id)
        socket.emit('sendmsg', {
            name: props.user.name,
            toid: props.user.id,
            msg: message
        })
        const msgs = messages
        msgs.push({ sender: props.me.username, message: message })
        setMessages(msgs)
        setMessage("")
    }
    console.log("messages", messages)
    return (
        <div className='conversation'>
            { props.user.name &&
                <div style={{ height: 'inherit' }} >
                    <h1>{props.user.name}</h1>
                    <div style={{ color: '#fff' }}>
                        {messages.map((msg) => {
                            console.log(msg);
                            <>
                                <a>{msg.sender}</a>
                                <a>{msg.message}</a>
                            </>

                            return;
                        })} </div>
                    <div className='footer'>
                        <input className='footer-input' type='text' onChange={(e) => { setMessage(e.target.value) }} value={message}></input>
                        <Button onClick={() => { onMessage() }} >send</Button>
                    </div>

                </div >
            }
        </div >
    )

}
export default Conversation