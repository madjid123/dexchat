/* eslint-disable array-callback-return */
import { Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AuthSelector } from "../../../features/user/authSlice";
import { RoomsSelectors, setAllRooms } from "../../../features/user/RoomsSlice";
import { clearAllMessages } from "../../../features/Conversation/MessagesSlice";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import "./Rooms.css";

import { useState } from "react";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { store } from "../../../app/store";

export interface Room {
  members: any[2];
}
const Rooms = (props: any) => {
  const dispatch = useDispatch();
  const rooms = useSelector(RoomsSelectors.selectAll);

  // const { rooms, error } = useSelector(RoomsSelectors);
  console.log(rooms);
  const { currentUser } = useSelector(AuthSelector);

  return (
    <>
      <Navbar
        variant="dark"
        className="sidebar flex-column "
        collapseOnSelect
        style={{ color: "white" }}
      >
        <Navbar.Brand href="#home">Room</Navbar.Brand>
        <Navbar.Toggle aria-target="colapsedSidbar" />
        <Navbar.Collapse className="flex-column" id="colapsedSidbar">
          <Nav className="flex-column">
            <Nav.Item>
              <div className="flex-row">
                <Input
                  placeholder="Search for new contact"
                  style={{ width: "90%", fontSize: "12px" }}
                  variant="light"
                />
                {/* <Button type="submit" /> */}
              </div>
            </Nav.Item>
            <Nav.Link>
              {rooms.map((room, index: number) => {
                return (
                  <Nav.Item
                    key={index}
                    onClick={() => {
                      props.setConversation(index);

                      if (room._id !== props.currentRoomId)
                        dispatch(clearAllMessages(""));
                    }}
                  >
                    <div>
                      <img
                        key={index}
                        src={"logo192.png"}
                        width="16"
                        height="16"
                        alt=""
                      />
                      {room.members.map((member: any) => {
                        if (currentUser && member._id !== currentUser._id)
                          return member.username;
                      })}
                    </div>
                    <br />
                  </Nav.Item>
                );
              })}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Rooms;
