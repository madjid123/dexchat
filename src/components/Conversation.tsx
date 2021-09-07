import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { io } from "socket.io-client"
import { Menu, MenuItem } from "react-pro-sidebar"
import { useSelector } from "react-redux"
import { AuthSelector } from "../features/user/authSlice"
import { MessagesSelector, Message, addMessage, clearAllMessages } from "../features/Conversation/MessagesSlice"
import { useAppDispatch } from "../app/hooks"
import "./Conversation.css"
import "react-bootstrap"
import { useCallback } from "react"
const socket = io("localhost:5001", {
    transports: ['websocket']
})
socket.connect()
interface ConversationProps {
    clearMsgs: boolean;
    setClearMsgs(arg0: boolean): void;
    member: any,
}
function Conversation(props: ConversationProps) {
    const { currentUser } = useSelector(AuthSelector)
    const { messages } = useSelector(MessagesSelector)
    const [member, setMember] = useState(props.member)
    const [message, setMessage] = useState("" as string)
    const dispatch = useAppDispatch()

    const getMessage = useCallback(() => {
        socket.on("getmsg", (data) => {
            console.log(data)
            const _message: Message = {
                to: {
                    name: data.username,
                    id: data.toid,
                },
                from: {
                    name: data.from,
                    id: data.fromId

                },
                content: data.message
            }
            dispatch(addMessage(_message))
            console.log(messages)
        })


    }, [])

    const onMessage = () => {
        if (message === '') return;
        if (socket.connected && currentUser !== undefined) {

            const { _id, name } = currentUser;
            const _message: Message = {
                to: {
                    name: member.name,
                    id: member._id
                },
                from: {
                    name: name,
                    id: _id
                },
                content: message
            }
            socket.emit('sendmsg', {
                from: currentUser?.name,
                fromId: currentUser?._id,
                name: member.name,
                toid: member._id,
                msg: message,
                roomId: socket.id
            })
            dispatch(addMessage(_message))
            setMessage("")
        }
    }
    useEffect(() => {
        setMember(props.member)
        if (props.clearMsgs === true) {
            props.setClearMsgs(false);
            clearAllMessages(null)
        }
    }, [props.member, props])

    useEffect(() => {
        if (currentUser !== undefined) {
            let user = {
                ...currentUser,
                id: currentUser._id.toString()
            }
            socket.emit('sendusr', { user: user, roomId: socket.id })
        }
    })
    useEffect(() => {
        getMessage()
    }, [getMessage])

    return (
        <div className='conversation' onKeyPress={(e) => {
            if (e.key === "Enter") {
                onMessage()
                console.log("Enter")
            }

        }}>
            {props.member.name &&
                <div style={{ height: '95%', overflowY: 'auto', overflowX: 'hidden', scrollBehavior: 'smooth' }} >
                    <h1>{props.member.name}</h1>
                    <Menu iconShape='square'>
                        {
                            messages.map((msg: Message, index) => {
                                return (
                                    <MenuItem key={index} className="MessageItem"  >
                                        <div className="message">
                                            <div className={(msg.from.name === currentUser?.name) ? "my-message-bull" : "other-message-bull"}>
                                                <div></div>
                                                <label>{msg.content}</label>

                                            </div>
                                            <br></br>

                                        </div>
                                    </MenuItem>
                                );

                            })}
                    </Menu>
                    <footer className='footer'>
                        <div style={{ width: "100%" }} className="footer">
                            <input className='footer-input' type='text' onChange={(e) => { setMessage(e.target.value) }} value={message}></input>
                            <Button className="footer-button form-input" style={{}}
                                onClick={() => { onMessage() }}
                            >Send</Button >
                        </div>
                    </footer>

                </div >
            }
        </div >
    )

}
export default Conversation