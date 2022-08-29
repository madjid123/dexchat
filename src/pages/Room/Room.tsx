import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import Header from "../../components/Header/Header"
import Conversation from "../../components/UserSpace/Conversation/Conversation"
import { clearAllMessages, setRoomId } from "../../features/Conversation/MessagesSlice"
import { AuthSelector } from "../../features/user/authSlice"
type RoomProps = {

}
const Room: FC<RoomProps> = (props) => {
    const dispatch = useDispatch();
    const closeConversation = () => {
        dispatch(clearAllMessages({}));
        dispatch(setRoomId(""));
    };
    const { currentUser, isAuth, isLoading } = useSelector(AuthSelector)
    const navigate = useNavigate()
    // useEffect(() => {
    //     console.log(isAuth)
    //     if (!isAuth) {
    //         console.log(isAuth)
    //         navigate("/login")
    //         return
    //     }
    // }, [currentUser])
    if (!isAuth) {
        navigate("/login")
    }
    return (
        <div className="my-container">
            < Header  ></Header >
            <Conversation closeConversation={closeConversation} isPage={true}></Conversation>
        </div >
    )
}
export default Room