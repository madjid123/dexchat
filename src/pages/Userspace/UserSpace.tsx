import Conversation from "../../components/UserSpace/Conversation/Conversation";

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthSelector } from "../../features/user/authSlice";
import {
  getRooms,
  RoomsSelectors,
  RoomUpdate,
} from "../../features/user/RoomsSlice";
import "./UserSpace.css";
import socket from "../../utils/socket";
import Header from "../../components/Header/Header";
import {
  clearAllMessages,
  MessagesSelector,
  setRoom,
} from "../../features/Conversation/MessagesSlice";
import SideTabs from "../../components/UserSpace/Tabs/Tabs";
import { OffCanvas } from "../../components/UserSpace/OffCanvas/OffCanvas";

const UserSpace = (props: any) => {
  // const [Member, setMember] = useState({} as any);
  const dispatch = useDispatch();
  const { currentUser, isAuth } = useSelector(AuthSelector);
  // const [clearMsgs, setClearMsgs] = useState(false);
  const [show, setShow] = useState(false);
  const rooms = useSelector(RoomsSelectors.selectAll);
  const { room } = useSelector(MessagesSelector);
  const [headerHeight, setHeaderHeight] = useState(0);
  useEffect(() => {
    socket.connect();
    socket.emit("sendsocket", {
      rooms: rooms.map((room) => {
        return room._id;
      }),
      user: currentUser,
    });
  }, [socket.disconnected, rooms]);

  const closeConvrstion = () => {
    // setMember({ _id: undefined });
    dispatch(clearAllMessages({}));
    dispatch(setRoom(null));
    // setClearMsgs(true);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="my-container">

      <div>
        <Header show={show} handleShow={handleShow}></Header>
      </div>
      {
        currentUser !== undefined ? (
          <div
            className="cont"

          >
            <SideTabs show={show} handleClose={handleClose} className="sidetabs"></SideTabs>
            <OffCanvas show={show} handleClose={handleClose}></OffCanvas>
            {room !== null ? (
              <Conversation closeConversation={closeConvrstion} isPage={false}></Conversation>
            ) : (
              <div></div>
            )}
          </div>

        ) : (
          <div></div>
        )
      }
    </div >
  );
};

export default UserSpace;
