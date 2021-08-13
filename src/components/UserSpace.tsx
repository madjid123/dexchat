
import Contacts from './Contacts'
import Conversation from './Conversation'


import { useState } from 'react';

interface User {
    id?: string,
    name?: string
}
const UserSpace = (props: any) => {
    const [user, setUser] = useState({} as User)

    const [clearMsgs, setClearMsgs] = useState(false);

    const SetClearMsgs = (b: boolean) => { setClearMsgs(b) }
    return (
        <div className="box-flex" style={{ "height": "100%" }}>
            <Contacts ></Contacts>
            <Conversation user={user} clearMsgs={clearMsgs} setClearMsgs={SetClearMsgs}></Conversation>
        </div>
    );
}

export default UserSpace;