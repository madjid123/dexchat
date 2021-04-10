
import Contacts from './Contacts'
import Conversation from './Conversation'


import { React, useState } from 'react';
import { Redirect } from 'react-router';


function UserSpace(props) {
    const [user, setUser] = useState({})

    const [clearMsgs, setClearMsgs] = useState(false);

    const getUser = (user) => {
        setUser(user)
    }
    const SetClearMsgs = (b) => { setClearMsgs(b) }
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