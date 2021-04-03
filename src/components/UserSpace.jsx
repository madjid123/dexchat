
import Contacts from './Contacts'
import Conversation from './Conversation'


import { React, useState } from 'react';


function UserSpace(props) {
    const [user, setUser] = useState({})

    const getUser = (user) => {
        setUser(user)
    }
    console.log(__filename, props.id)
    return (
        <>
            <div className="box-flex">
                <Contacts id={props.id} setUser={getUser}></Contacts>
                <Conversation user={user} me={{ username: props.username, id: props.id }}></Conversation>
            </div>
        </>
    );
}

export default UserSpace;