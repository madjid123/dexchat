
import Rooms, { Room } from './Rooms'
import Conversation from './Conversation'


import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { AuthSelector } from "../features/user/authSlice";
import { RoomsSelector, getRooms } from "../features/user/RoomsSlice"

interface User {
    _id: string,
    name: string
}
const UserSpace = (props: any) => {
    const [user, setUser] = useState({} as User)
    const dispatch = useDispatch();
    const { currentUser, isAuth } = useSelector(AuthSelector)
    const [clearMsgs, setClearMsgs] = useState(false);

    useEffect(() => {
        let id = undefined
        if (currentUser !== undefined) {
            id = currentUser._id
            dispatch(getRooms(id))
        }

    }, [currentUser, isAuth])

    const { rooms } = useSelector(RoomsSelector)
    const SetClearMsgs = (b: boolean) => { setClearMsgs(b) }
    return (
        <div className="box-flex" style={{ "height": "100%" }}>
            <Rooms rooms={rooms}  ></Rooms>
            <Conversation user={user} clearMsgs={clearMsgs} setClearMsgs={SetClearMsgs}></Conversation>
        </div>
    );
}

export default UserSpace;