import e from 'cors';
import { React, useState } from 'react';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client'

var socket = io("localhost:5001", { transports: ['websocket'] })
socket.connect()
function Conversation(props) {

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    socket.on("sendmsg", (data) => {
        if (data.id !== props.user.id) return;
        const msgs = messages
        msgs.push({ name: data.username, id: data.message })
    })
    const onMessage = () => {
        if (message === '') return;
        socket.emit('getmsg', {
            name: props.user.name,
            id: props.user.id,
            msg: message
        })
        const msgs = messages
        msgs.push({ sender: props.me.username, message: message })
        setMessages(msgs)
        setMessage("")
    }
    console.log(messages)
    return (
        <div className='conversation'>
            { props.user.name &&
                <div style={{ height: 'inherit' }} >
                    <h1>{props.user.name}</h1>
                    {messages.map((msg) => {
                        <div>

                            <p>msg.sender</p>
                            <p>msg.message</p>

                        </div>
                    })}
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