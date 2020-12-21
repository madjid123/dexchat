import { ProSidebar, Menu, MenuItem, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import Logo from "./logo192.png"
import React from 'react';

function Contacts() {
    return (
        <>
            <ProSidebar>
                <SidebarHeader>
                    <h1> Contact</h1>
                </SidebarHeader>
                <Menu iconShape="square">
                    <MenuItem > <img src={Logo} size="small" width="16" height="16" /> Contact 1 </MenuItem>
                    <MenuItem ><img src={Logo} size="small" width="16" height="16" /> Contact 2 </MenuItem>
                    <MenuItem ><img src={Logo} size="small" width="16" height="16" /> Contact 3 </MenuItem>
                    <MenuItem ><img src={Logo} size="small" width="16" height="16" /> Contact 1 </MenuItem>
                    <MenuItem ><img src={Logo} size="small" width="16" height="16" /> Contact 1 </MenuItem>
                    <MenuItem ><img src={Logo} size="small" width="16" height="16" /> Contact 1 </MenuItem>
                    <MenuItem ><img src={Logo} size="small" width="16" height="16" /> Contact 1 </MenuItem>
                </Menu>
            </ProSidebar>
        </>
    );
}

export default Contacts;



