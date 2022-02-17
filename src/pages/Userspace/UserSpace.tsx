import Rooms, { Room } from "./Rooms/Rooms";
import Conversation from "./Conversation/Conversation";

import { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AuthSelector } from "../../features/user/authSlice";
import { getRooms, RoomsSelectors } from "../../features/user/RoomsSlice";
import Footer, { SideBar, FooterHeight } from "../../components/Footer/Footer";

import "./UserSpace.css";
import socket from "../../utils/socket";
import Header from "../../components/Header/Header";
import { setRoomId } from "../../features/Conversation/MessagesSlice";
import { unmountComponentAtNode } from "react-dom";
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
  const rooms = useSelector(RoomsSelectors.selectAll);
  const conversation = useRef(null);
  useEffect(() => {
    socket.connect();
    // if (socket.connected === true)
    socket.emit("sendsocket", {
      rooms: rooms.map((room) => {
        return room._id;
      }),
      roomId: socket.id,
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

  const setConversation = (index: number) => {
    const room = rooms[index];
    dispatch(setRoomId(room._id));
    room.members.forEach((member: any) => {
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
  const closeConvrstion = () => {
    console.log("cloooose");
    setMember({ _id: undefined });
    //should save messages in the specific toom here..
    setClearMsgs(true);
    setCurrentRoomId("");
  };

  return (
    <>
      <Header history={props.history}></Header>
      {currentUser !== undefined ? (
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
                closeConversation={closeConvrstion}
              ></Conversation>
            ) : (
              <div></div>
            )}
          </div>
          <Footer></Footer>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default UserSpace;
