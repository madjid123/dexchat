/* eslint-disable array-callback-return */
import { ProSidebar, Menu, MenuItem, SidebarHeader } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import axios from "axios";
import URL from "../URL";
import { useState, useEffect, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { AuthSelector } from "../features/user/authSlice";
import { RoomsSelector } from "../features/user/RoomsSlice"


export interface Room {
  members: any[2];
}
const Rooms = (props: any) => {

  const { rooms } = useSelector(RoomsSelector)

  const { currentUser, isAuth } = useSelector(AuthSelector)
  return (
    <>
      <ProSidebar className="sidebar">
        <SidebarHeader>
          <h1> Rooms</h1>
          <br></br>
        </SidebarHeader>
        <Menu iconShape="square" >
          {
            rooms.map((room: any, index: number) => {
              return (
                <MenuItem
                  key={index}
                  onClick={() => { props.setConversation(index) }}
                >
                  <img
                    key={index}
                    src={"logo192.png"}
                    width="16"
                    height="16"
                    alt=""
                  />
                  <div>
                    {room.members.map((member: any) => { if (currentUser && member._id !== currentUser._id) return member.name; })}
                  </div>
                </MenuItem>)
            })
          }
        </Menu>
      </ProSidebar>
    </>
  );
};

export default Rooms;
