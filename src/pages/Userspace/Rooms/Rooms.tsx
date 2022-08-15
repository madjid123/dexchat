/* eslint-disable array-callback-return */
import { Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AuthSelector } from "../../../features/user/authSlice";
import {
  RoomErrorSelector,
  RoomSelector,
  RoomsSelectors,
  RoomUpdate,
  setAllRooms,

} from "../../../features/user/RoomsSlice";
import {
  clearAllMessages,
  MessagesSelector,
  setMessagesState,
  setRoomId,
} from "../../../features/Conversation/MessagesSlice";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import "./Rooms.css";

import { useState } from "react";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { store } from "../../../app/store";
import socket from "../../../utils/socket";
import { Person, PersonFill } from "react-bootstrap-icons";

export interface Room {
  members: any[2];
}
const Rooms = (props: any) => {
  const dispatch = useDispatch();
  const rooms = useSelector(RoomsSelectors.selectAll);
  const ids = useSelector(RoomsSelectors.selectIds);
  const { roomId, messagesResponse } = useSelector(MessagesSelector);
  const { error } = useSelector(RoomSelector);
  const { currentUser } = useSelector(AuthSelector);

  return (
    <>
      <Navbar
        variant="dark"
        className="sidebare flex-column "
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
                  variant="dark"
                />
              </div>
            </Nav.Item>
            <Nav.Link>
              <div className="d-flex">
                {rooms.map((room, index: number) => {
                  return (
                    <Nav.Item
                      key={index}
                      onClick={() => {
                        if (room._id !== roomId) {
                          dispatch(setRoomId(room._id));

                        }
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-center p-2">

                        <div className="mx-1 d-flex align-items-center">
                          <PersonFill size={22}></PersonFill>
                        </div>

                        <div>                      {
                          room.members.map((member: any) => {
                            if (currentUser && member._id !== currentUser._id)
                              return member.username;
                          })
                        }
                        </div>

                      </div>
                      <br />
                    </Nav.Item>

                  );
                })
                }
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Rooms;
