/* eslint-disable array-callback-return */
import { Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AuthSelector } from "../../../features/user/authSlice";
import {
  getRooms,
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

import { useEffect, useState } from "react";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { store } from "../../../app/store";
import socket from "../../../utils/socket";
import { Person, PersonFill } from "react-bootstrap-icons";
import { useLazyGetAllUsersQuery, useLazyGetRoomsQuery } from "../../../services/searchApi";
export interface Room {
  members: any[2];
}
const Rooms = (props: any) => {
  const dispatch = useDispatch();
  const rooms = useSelector(RoomsSelectors.selectAll);
  const ids = useSelector(RoomsSelectors.selectIds);
  const { roomId } = useSelector(MessagesSelector);
  const { currentUser, isAuth } = useSelector(AuthSelector);
  const [pattern, setPattern] = useState("");
  const [trigger] = useLazyGetRoomsQuery();

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    setPattern(target.value)

  }
  useEffect(() => {
    let id = undefined;
    if (currentUser !== undefined) {
      id = currentUser._id;
      if (pattern.length === 0)
        dispatch(getRooms({ id: id }));
      else
        trigger({ pattern: pattern, user_id: currentUser._id })

    }
  }, [isAuth, pattern]);
  useEffect(() => {
    if (currentUser !== undefined && pattern !== "") {
    }
  }, [currentUser, pattern])
  return (
    <>
      <Navbar
        variant="dark"
        className="sidebar. flex-column "
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
                  onChange={handleChange}
                />
              </div>
            </Nav.Item>
            <Nav.Link>
              <div className="d-flex flex-column ">
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
                      <div className="d-flex align-items-center justify-content-begin">

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
