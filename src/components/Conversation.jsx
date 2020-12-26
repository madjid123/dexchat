import React from 'react';
import { useState } from 'react'
import axios from 'axios'

function Conversation(props) {
    const [message, setMessage] = useState("")
    const handleChange = (e) => {
        setMessage(e.target.value)

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage(e.target.value)
        axios.get('http://localhost:5000/sendmsg').then((res) => {
            console.log("Message is sent", res)
        }).catch((error) => { console.log(error) });
    }



    return (
        <>
            <form className="msgForm" onSubmit={handleSubmit} >
                <input type="text" name='msg' onChange={handleChange}></input>
                <input type="submit" value="send"></input>
            </form>
            <a> {message}</a>
        </>
    )

}
export default Conversation