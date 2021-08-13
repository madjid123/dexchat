/* eslint-disable array-callback-return */
import { ProSidebar, Menu, MenuItem, SidebarHeader } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import axios from "axios";
import URL from "../URL";
import { useState, useEffect, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { AuthSelector } from "../features/user/authSlice";


interface Contact {
  members: any[2];
}
const Contacts = (props: any) => {
  const [contacts, setContacts] = useState([] as Contact[])
  const { currentUser, isAuth } = useSelector(AuthSelector)
  useEffect(() => {
    axios
      .get(URL + "/user/contacts/" + ((currentUser !== undefined) ? currentUser._id : ""), { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          if (isAuth) {
            console.log(res.data.Rooms)
            setContacts((_state: SetStateAction<any[]>) => {
              const Rooms = res.data.Rooms as Contact[]
              console.log(Rooms)
              return Rooms
            })
          }
        } else {
          return;
        }
      })
      .catch((err) => console.error(err));
  }, [currentUser, isAuth])

  return (
    <>
      <ProSidebar className="sidebar">
        <SidebarHeader>
          <h1> Contacts</h1>
          <br></br>
        </SidebarHeader>
        <Menu iconShape="square" >
          {
            contacts.map((value: Contact, index: number) => {
              return (
                <MenuItem
                  key={index}
                  onClick={() => { console.log("MenuItem clikced ") }}
                >
                  <img
                    key={index}
                    src={"logo192.png"}
                    width="16"
                    height="16"
                    alt=""
                  />
                  <div>
                    {value.members.map((member: any) => { if (currentUser && member._id !== currentUser._id) return member.name; })}
                  </div>
                </MenuItem>)
            })
          }
        </Menu>
      </ProSidebar>
    </>
  );
};

export default Contacts;
