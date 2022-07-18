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

const UserSpace = (props: any) => {
  const [Member, setMember] = useState({} as any);
  const dispatch = useDispatch();
  const { currentUser, isAuth } = useSelector(AuthSelector);
  const [CurrentRoomId, setCurrentRoomId] = useState("");
  const [clearMsgs, setClearMsgs] = useState(false);
  const [showed, setShowed] = useState(true);
  const rooms = useSelector(RoomsSelectors.selectAll);
  const { messagesResponse, roomId } = useSelector(MessagesSelector);
  const [headerHeight, setHeaderHeight] = useState(0);
  const header = useRef({} as React.Component);
  useEffect(() => {
    socket.connect();
    // if (socket.connected === true)
    socket.emit("sendsocket", {
      rooms: rooms.map((room) => {
        return room._id;
      }),
      // roomId: socket.id,
      user: currentUser,
    });
    // else console.log("socket not connected");
  }, [socket.disconnected, rooms]);
  useEffect(() => {
    let id = undefined;
    if (currentUser !== undefined) {
      id = currentUser._id;
      dispatch(getRooms({ id: id }));
    }
  }, [isAuth]);
  useEffect(() => {
    window.addEventListener("resize", (e) => {
      if (window.screen.width < 500) setShowed(false);
      else setShowed(true);
    });
  });

  const closeConvrstion = () => {
    setMember({ _id: undefined });
    //should save messages in the specific toom here..
    // dispatch(
    //   RoomUpdate({ id: CurrentRoomId, changes: { messages: messagesResponse } })
    // );
    dispatch(clearAllMessages({}));
    dispatch(setRoomId(""));
    setClearMsgs(true);
    // setCurrentRoomId("");
  };

  // const headerHeight =
  // document.getElementsByClassName("header-nav")[0].clientHeight;
  return (
    <div className="my-container">
      <div>
        <Header history={props.history}></Header>
      </div>
      {currentUser !== undefined ? (
        // <div style={{ height: `${100 - FooterHeight}vh` }}>
        <div style={{ height: "calc(100vh - var(--header-height))" }}>
          <div
            className="cont"
            style={{
              display: "flex",
              // height: "94vh",
              // height: `${100 - FooterHeight}vh`,
              height: `calc(100% - var(--header-height)))`,
            }}
          >
            {showed ? <SideTabs></SideTabs> : <></>}
            {roomId !== "" ? (
              <Conversation closeConversation={closeConvrstion}></Conversation>
            ) : (
              <div></div>
            )}
          </div>
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
