import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useMatch } from "react-router"
import { Navigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Conversation from "../../components/UserSpace/Conversation/Conversation"
import { clearAllMessages, setRoomId } from "../../features/Conversation/MessagesSlice"
import { AuthSelector, CheckisAuth } from "../../features/user/authSlice"
import { MessagesSelector } from "../../features/Conversation/MessagesSlice"
type RoomProps = {
}
const Room: FC<RoomProps> = (props) => {
    const dispatch = useDispatch();
    const closeConversation = () => {
        dispatch(clearAllMessages({}));
    };
    const { currentUser, isAuth, isLoading } = useSelector(AuthSelector)
    const { roomId } = useSelector(MessagesSelector)
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const match = useMatch("/room/:id")
    useEffect(() => {
        if (roomId == "" && match?.params.id !== undefined)
            dispatch(setRoomId(match?.params.id));
    }, [roomId])
    useEffect(() => {
        dispatch(CheckisAuth())
    })
    const handleShow = () => setShow(true)
    console.log(isAuth)
    return (
        (!isAuth) && (<Navigate to="/login" />) ||
        <div className="my-container">
            (console.log(isAuth))
            < Header show={show} handleShow={handleShow}  ></Header >
            <Conversation closeConversation={closeConversation} isPage={true}></Conversation>
        </div >
    )
}
export default Room

function dispatch(arg0: { payload: string; type: string }) {
    throw new Error("Function not implemented.")
}
