import { ProSidebar, Menu, MenuItem, SidebarHeader } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import axios from "axios";
import URL from "../URL";
import React, { useState } from "react";

type ContactsProps = {
  id: string;
  setUser: (user: any) => void;
  user: any | undefined;
  clearMessages: () => void;
};
const Contacts = (props: ContactsProps) => {
  const [contacts, setContacts] = useState([] as any[]);

  if (contacts.length === 0) {
    axios
      .get(URL + "/user/contacts/" + props.id)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.Contacts) {
            setContacts(res.data.Contacts);
          }
        } else {
          console.log(res);
          return;
        }
      })
      .catch((err) => console.error(err));
  }
  return (
    <>
      <ProSidebar className="sidebar">
        <SidebarHeader>
          <h1> Contact</h1>
        </SidebarHeader>
        <Menu iconShape="square">
          {contacts.map((value: any, index: number): any => (
            <MenuItem
              key={index}
              onClick={() => {
                props.setUser({ name: value.name, id: value._id });
                if (props.user && props.user.name !== value.name)
                  props.clearMessages();
              }}
            >
              <img
                key={index}
                src={"logo192.png"}
                width="16"
                height="16"
                alt=""
              />{" "}
              {value.name}
            </MenuItem>
          ))}
        </Menu>
      </ProSidebar>
    </>
  );
};

export default Contacts;
