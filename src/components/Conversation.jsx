import React from 'react';
import { useState } from 'react'

function Conversation() {
    const [message, setMessage] = useState("")
    const handleSubmit = (e) => {
        setMessage(e.target.value)


    }
    return (
        <>
            <form className="msgForm" onSubmit={handleSubmit} action='localhost:5000/sendmsg' method='get'>
                <input type="text" name='msg'></input>
                <input type="submit" value="send"></input>
            </form>
        </>
    )
}

export default Conversation;