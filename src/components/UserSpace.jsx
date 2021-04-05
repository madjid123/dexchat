
import Contacts from './Contacts'
import Conversation from './Conversation'


import { React, useState } from 'react';
import { Redirect } from 'react-router';


function UserSpace(props) {
    const [user, setUser] = useState({})

    const [clearMsgs, setClearMsgs] = useState(false);
    const clearMessages = () => {
        setClearMsgs(true);
    }
    const getUser = (user) => {
        setUser(user)
    }
    if (props.id === "" && props.username === "") { return (<Redirect to="/login"></Redirect>) }
    else
        return (
            <>
                <div className="box-flex">
                    <Contacts id={props.id} setUser={getUser} clearMessages={() => { clearMessages() }} user={user}></Contacts>
                    <Conversation user={user} me={{ username: props.username, id: props.id }} clearMsgs={() => { return clearMsgs }}></Conversation>
                </div>
            </>
        );
}

export default UserSpace;