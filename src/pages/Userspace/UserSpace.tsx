import Rooms from "./Rooms/Rooms";
import Conversation from "./Conversation/Conversation";

import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AuthSelector } from "../../features/user/authSlice";
import { RoomsSelector, getRooms } from "../../features/user/RoomsSlice";
import Footer, { SideBar, FooterHeight } from "../../components/Footer/Footer";

import "./UserSpace.css";
import socket from "../../utils/socket";
import Header from "../../components/Header/Header";
// interface User {
//     _id: string,
//     name: string
// }
const UserSpace = (props: any) => {
  const [Member, setMember] = useState({} as any);
  const dispatch = useDispatch();
  const { currentUser, isAuth } = useSelector(AuthSelector);
  const [CurrentRoomId, setCurrentRoomId] = useState("");
  const [clearMsgs, setClearMsgs] = useState(false);
  const [showed, setShowed] = useState(true);

  useEffect(() => {
    socket.connect();
    if (socket.connected === true)
      socket.emit("sendusr", { user: currentUser, roomId: socket.id });
    else console.log("socket not connected");
  }, [socket.connected]);
  useEffect(() => {
    let id = undefined;
    if (currentUser !== undefined) {
      id = currentUser._id;
      dispatch(getRooms({ id: id }));
    }
  }, [currentUser, dispatch, isAuth]);
  useEffect(() => {
    window.addEventListener("resize", (e) => {
      if (window.screen.width < 500) setShowed(false);
      else setShowed(true);
    });
  });

  const { rooms } = useSelector(RoomsSelector);
  const setConversation = (index: number) => {
    const room = rooms[index];
    room.members.forEach((member) => {
      if (member._id !== currentUser?._id) {
        setCurrentRoomId(room._id);
        setMember(member);
        return;
      }
    });
  };
  const SetClearMsgs = (b: boolean) => {
    setClearMsgs(b);
  };

  return currentUser !== undefined ? (
    <div style={{ height: `${100 - FooterHeight}%` }}>
      <div
        className=""
        style={{
          display: "flex",
          height: "94vh",
        }}
      >
        {showed ? (
          <Rooms
            setConversation={setConversation}
            currentRoomId={CurrentRoomId}
          ></Rooms>
        ) : (
          <></>
        )}
        {Member._id !== undefined ? (
          <Conversation
            CurrentRoomId={CurrentRoomId}
            member={Member}
            clearMsgs={clearMsgs}
            setClearMsgs={SetClearMsgs}
          ></Conversation>
        ) : (
          <div></div>
        )}
      </div>
      <Footer></Footer>
    </div>
  ) : (
    <div></div>
  );
};

export default UserSpace;
