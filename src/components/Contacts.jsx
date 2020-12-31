import { ProSidebar, Menu, MenuItem, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';


import React from 'react';

function Contacts() {
    return (
        <>
            <ProSidebar className="sidebar">
                <SidebarHeader>
                    <h1> Contact</h1>
                </SidebarHeader>
                <Menu iconShape="square">
                    <MenuItem > <img src={"logo192.png"} size="small" width="16" height="16" alt='' /> Contact 1 </MenuItem>
                    <MenuItem ><img src={"logo192.png"} size="small" width="16" height="16" alt='' /> Contact 2 </MenuItem>
                    <MenuItem ><img src={"logo192.png"} size="small" width="16" height="16" alt='' /> Contact 3 </MenuItem>
                    <MenuItem ><img src={"logo192.png"} size="small" width="16" height="16" alt='' /> Contact 1 </MenuItem>
                    <MenuItem ><img src={"logo192.png"} size="small" width="16" height="16" alt='' /> Contact 1 </MenuItem>
                    <MenuItem ><img src={"logo192.png"} size="small" width="16" height="16" alt='' /> Contact 1 </MenuItem>
                    <MenuItem ><img src={"logo192.png"} size="small" width="16" height="16" alt='' /> Contact 1 </MenuItem>
                </Menu>
            </ProSidebar>
        </>
    );
}

export default Contacts;



