import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useMatch, useParams } from "react-router"
import { Navigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Conversation from "../../components/UserSpace/Conversation/Conversation"
import { clearAllMessages, setRoom } from "../../features/Conversation/MessagesSlice"
import { CheckisAuth } from "../../features/user/authSlice"
import { MessagesSelector } from "../../features/Conversation/MessagesSlice"
import { useAuthContext } from "../../contexts/authentication/AuthContext"
import { useLazyGetMessagesByRoomIdQuery } from "../../services/MessageApi"
import { useAppDispatch } from "../../app/hooks"
type RoomProps = {
}
const Room: FC<RoomProps> = (props) => {
    const dispatch = useAppDispatch();
    const closeConversation = () => {
        dispatch(clearAllMessages({}));
    };

    const { room } = useSelector(MessagesSelector)
    const [show, setShow] = useState(false)
    const { id } = useParams()
    const [trigger] = useLazyGetMessagesByRoomIdQuery()
    const match = useMatch("/room/:id")
    useEffect(() => {
        if (room == null && id !== undefined)
            trigger({ room_id: id, page: 1 })
    }, [room])
    const handleShow = () => setShow(true)

    return (
        <Conversation closeConversation={closeConversation} isPage={true}></Conversation>
    )
}
export default Room

function dispatch(arg0: { payload: string; type: string }) {
    throw new Error("Function not implemented.")
}
