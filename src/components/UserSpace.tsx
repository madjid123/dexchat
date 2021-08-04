
import Contacts from './Contacts'
import Conversation from './Conversation'


import React, { useState } from 'react';

interface User {
    id?: string,
    name?: string
}
const UserSpace = (props: any) => {
    const [user, setUser] = useState({} as User)

    const [clearMsgs, setClearMsgs] = useState(false);

    const getUser = (user: User) => {
        setUser(user)
    }
    const SetClearMsgs = (b: boolean) => { setClearMsgs(b) }
    return (
        <>
            <div className="box-flex">
                <Contacts id={props.id} setUser={getUser} clearMessages={() => { setClearMsgs(true) }} user={user}></Contacts>
                <Conversation user={user} me={{ username: props.username, id: props.id }} clearMsgs={clearMsgs} setClearMsgs={SetClearMsgs}></Conversation>
            </div>
        </>
    );
}

export default UserSpace;