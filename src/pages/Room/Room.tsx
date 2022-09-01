import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useMatch, useParams } from "react-router"
import { Navigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Conversation from "../../components/UserSpace/Conversation/Conversation"
import { clearAllMessages, setRoomId } from "../../features/Conversation/MessagesSlice"
import { CheckisAuth } from "../../features/user/authSlice"
import { MessagesSelector } from "../../features/Conversation/MessagesSlice"
import { useAuthContext } from "../../contexts/authentication/AuthContext"
type RoomProps = {
}
const Room: FC<RoomProps> = (props) => {
    const dispatch = useDispatch();
    // const { currentUser, isAuth, isLoading } = useSelector(AuthSelector)
    const closeConversation = () => {
        dispatch(clearAllMessages({}));
    };
    const { roomId } = useSelector(MessagesSelector)
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const params = useParams()

    const match = useMatch("/room/:id")
    const { authState } = useAuthContext()
    useEffect(() => {
        if (roomId == "" && match?.params.id !== undefined)
            dispatch(setRoomId(match?.params.id));
    }, [roomId])
    useEffect(() => {
        dispatch(CheckisAuth())
    })
    const handleShow = () => setShow(true)

    return (
        <div className="my-container sidebar">
            < Header show={show} handleShow={handleShow}  ></Header >
            <Conversation closeConversation={closeConversation} isPage={true}></Conversation>
        </div >
    )
}
export default Room

function dispatch(arg0: { payload: string; type: string }) {
    throw new Error("Function not implemented.")
}
