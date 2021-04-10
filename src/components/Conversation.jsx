import e from 'cors';
import { React, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client'
import { Menu, MenuItem } from 'react-pro-sidebar'
var socket = io("localhost:5001", { transports: ['websocket'] })
socket.connect()
function Conversation(props) {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    socket.emit('sendusr', { me: props.me })
    socket.once("getmsg", (data) => {
        const msgs = messages
        msgs.push({ sender: data.username, message: data.message })
        setMessages(msgs)
    })

    const onMessage = () => {
        if (message === '') return;

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
    useEffect(() => {
        if (!props.clearMsgs) return;
        props.setClearMsgs(false);
        console.log(props.clearMsgs)
        setMessages([]);

    }, [props.clearMsgs === true])
    return (
        <div className='conversation'>
            { props.user.name &&
                <div style={{ height: '95%', overflowY: 'auto', overflowX: 'hidden', scrollBehavior: 'smoth' }} >
                    <h1>{props.user.name}</h1>
                    <Menu >

                        {messages.map((msg, index) => {
                            return (
                                <MenuItem key={index}  >
                                    <h5>{msg.sender}</h5>
                                    <br></br>
                                    <a>{msg.message}</a>
                                    <hr style={{ color: '#fff' }}></hr>
                                </MenuItem>
                            );

                        })}
                    </Menu>
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