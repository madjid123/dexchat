
import Contacts from './Contacts'
import Conversation from './Conversation'


import { React, useState } from 'react';


function UserSpace(props) {
    const [name, setName] = useState("")

    const getName = (Name) => {
        setName(Name)
        console.log(name)
    }
    return (
        <>
            <div className="box-flex">
                <Contacts id={props.id} setName={getName}></Contacts>
                <Conversation name={name}></Conversation>
            </div>
        </>
    );
}

export default UserSpace;