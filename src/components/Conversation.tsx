import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { io, Socket } from 'socket.io-client'
import { Menu, MenuItem } from 'react-pro-sidebar'
import { useSelector } from 'react-redux';
import { AuthSelector } from '../features/user/authSlice';
import { current } from '@reduxjs/toolkit';
//import { socket } from "../utils/io"



function Conversation(props: any) {
    const { currentUser, isAuth } = useSelector(AuthSelector)
    const [socket, setSocket] = useState(io("localhost:5001", {
        query: { id: currentUser?._id },
        transports: ['websocket']
    }))
    const [ComingMessage, setComingMessage] = useState({} as any)
    const [message, setMessage] = useState("" as string)
    const [messages, setMessages] = useState([] as any[])



    const onMessage = () => {
        if (message === '') return;
        if (socket) {
            socket.emit('sendmsg', {
                from: currentUser?.name,
                name: props.member.name,
                toid: props.member._id,
                msg: message,
                roomId: socket.id
            })
            const msgs = messages
            msgs.push({ sender: currentUser?.name, message: message })
            setMessages(msgs)
            setMessage("")
        }
    }
    useEffect(() => {
        //        const newsocket = ;
        // setSocket(newsocket)
        if (!props.clearMsgs) return;
        props.setClearMsgs(false);
        setMessages([]);
        return () => { socket.close() }
    }, [currentUser?._id, props, socket])
    useEffect(() => {
        if (currentUser !== undefined) {
            let user = {
                ...currentUser,
                id: currentUser._id.toString()
            }
            socket.emit('sendusr', { user: user, roomId: socket.id })

        }

    }, [currentUser, message, props.member, socket])
    useEffect(() => {
        socket.on("getmsg", (data: any) => {
            console.log(props.member, data)
            setComingMessage(data)
        })
    }, [message, props.member, socket])
    useEffect(() => {
        console.log(ComingMessage)
        ComingMessage && (setMessages((msgs: any) => {
            msgs.push({ sender: ComingMessage?.from, message: ComingMessage?.message })
            console.log(msgs)
            return msgs
        }))
    }, [ComingMessage])

    return (
        <div className='conversation'>
            {props.member.name &&
                <div style={{ height: '95%', overflowY: 'auto', overflowX: 'hidden', scrollBehavior: 'smooth' }} >
                    <h1>{props.member.name}</h1>
                    <Menu iconShape='square'>
                        {
                            messages.map((msg, index) => {
                                return (
                                    <MenuItem key={index}  >
                                        <h5>{msg.sender}</h5>
                                        <br></br>
                                        <label>{msg.message}</label>
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