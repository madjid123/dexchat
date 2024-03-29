
import Rooms from "./Rooms"
import Conversation from "./Conversation"


import { useState, useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"
import { AuthSelector } from "../features/user/authSlice"
import { RoomsSelector, getRooms } from "../features/user/RoomsSlice"

// interface User {
//     _id: string,
//     name: string
// }
const UserSpace = (props: any) => {
    const [Member, setMember] = useState({} as any)
    const dispatch = useDispatch();
    const { currentUser, isAuth } = useSelector(AuthSelector)
    const [CurrentRoomId, setCurrentRoomId] = useState("")
    const [clearMsgs, setClearMsgs] = useState(false);

    useEffect(() => {
        let id = undefined
        if (currentUser !== undefined) {
            id = currentUser._id
            dispatch(getRooms({ id: id }))
        }

    }, [currentUser, dispatch, isAuth])
    const { rooms } = useSelector(RoomsSelector)
    const setConversation = (index: number) => {
        const room = rooms[index]

        room.members.forEach(member => {

            if (member._id !== currentUser?._id) {
                setCurrentRoomId(room._id)
                setMember(member)
                return;
            }
        })

    }
    const SetClearMsgs = (b: boolean) => { setClearMsgs(b) }
    return (
        <div className="box-flex" style={{ "height": "100%" }}>
            <Rooms setConversation={setConversation} currentRoomId={CurrentRoomId}  ></Rooms>
            <Conversation CurrentRoomId={CurrentRoomId} member={Member} clearMsgs={clearMsgs} setClearMsgs={SetClearMsgs}></Conversation>
        </div>
    );
}

export default UserSpace;