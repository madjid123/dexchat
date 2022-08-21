import Rooms from "./Rooms/Rooms";
import Conversation from "./Conversation/Conversation";

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthSelector } from "../../features/user/authSlice";
import {
  getRooms,
  RoomsSelectors,
  RoomUpdate,
} from "../../features/user/RoomsSlice";
import Footer, { SideBar, FooterHeight } from "../../components/Footer/Footer";
import Container from "react-bootstrap/Container"
import "./UserSpace.css";
import socket from "../../utils/socket";
import Header from "../../components/Header/Header";
import {
  clearAllMessages,
  MessagesSelector,
  setRoomId,
} from "../../features/Conversation/MessagesSlice";
import SideTabs from "./Tabs/Tabs";
import { useMediaQuery } from "react-responsive";
import { Stack } from "react-bootstrap";
import { OffCanvas } from "./OffCanvas/OffCanvas";

const UserSpace = (props: any) => {
  const [Member, setMember] = useState({} as any);
  const dispatch = useDispatch();
  const { currentUser, isAuth } = useSelector(AuthSelector);
  const [CurrentRoomId, setCurrentRoomId] = useState("");
  const [clearMsgs, setClearMsgs] = useState(false);
  const [show, setShow] = useState(false);
  const rooms = useSelector(RoomsSelectors.selectAll);
  const { roomId } = useSelector(MessagesSelector);
  const [headerHeight, setHeaderHeight] = useState(0);
  // const header = useRef({} as React.Component);
  useEffect(() => {
    socket.connect();
    socket.emit("sendsocket", {
      rooms: rooms.map((room) => {
        return room._id;
      }),
      user: currentUser,
    });
  }, [socket.disconnected, rooms]);

  // useEffect(() => {
  //   window.addEventListener("resize", (e) => {
  //     if (window.screen.width < 500) setShowed(false);
  //     else setShowed(true);
  //   });
  // });
  // const MediaQuery = useMediaQuery({})
  const closeConvrstion = () => {
    setMember({ _id: undefined });
    dispatch(clearAllMessages({}));
    dispatch(setRoomId(""));
    setClearMsgs(true);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="my-container">

      <div>
        <Header history={props.history} show={show} handleShow={handleShow}></Header>
      </div>
      {currentUser !== undefined ? (
        <div
          className="cont"

        >
          <SideTabs show={show} handleClose={handleClose} className="sidetabs"></SideTabs>
          <OffCanvas show={show} handleClose={handleClose}></OffCanvas>
          {roomId !== "" ? (
            <Conversation closeConversation={closeConvrstion}></Conversation>
          ) : (
            <div></div>
          )}
        </div>

      ) : (
        <div></div>
      )}
    </div>
  );
};

export default UserSpace;
function useElementSize(): [any, any] {
  throw new Error("Function not implemented.");
}
