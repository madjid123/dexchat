
import Contacts from './Contacts'
import Conversation from './Conversation'


import React from 'react';

function UserSpace(props) {

    return (
        <>
            <Contacts id={props.id}></Contacts>
            <Conversation></Conversation>
        </>
    );
}

export default UserSpace;