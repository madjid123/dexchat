import { ProSidebar, Menu, MenuItem, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import axios from 'axios';
import Url from '../URL'
import { React, useState } from 'react';

function Contacts(props) {
    const [contacts, setContacts] = useState([])
    axios.get(Url.API_URL + '/user/' + props.id).then((res) => {
        if (res.status === 200) {

            if (res.data.Contacts)
                setContacts(res.data.Contacts)
        }
    }).catch(err => console.error(err))
    return (
        <>
            <ProSidebar className="sidebar">
                <SidebarHeader>
                    <h1> Contact</h1>
                </SidebarHeader>
                <Menu iconShape="square">
                    {contacts.map((value) => <MenuItem onClick={ }> <img src={"logo192.png"} size="small" width="16" height="16" alt='' /> {value.name} </MenuItem>)}


                </Menu>
            </ProSidebar>
        </>
    );
}

export default Contacts;



