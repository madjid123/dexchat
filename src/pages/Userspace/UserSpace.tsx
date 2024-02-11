import Conversation from "../../components/UserSpace/Conversation/Conversation";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AuthSelector } from "../../features/user/authSlice";
import { RoomsSelectors } from "../../features/user/RoomsSlice";
import "./UserSpace.css";
import socket from "../../utils/socket";
import {
  clearAllMessages,
  MessagesSelector,
  setRoom,
} from "../../features/Conversation/MessagesSlice";
import SideTabs from "../../components/UserSpace/Tabs/Tabs";
import { useAppDispatch } from "../../app/hooks";
import Layout from "~/components/Layout/Layout";
import Hero from "~/components/UserSpace/Hero";

const UserSpace = (props: any) => {
  // const [Member, setMember] = useState({} as any);
  const dispatch = useAppDispatch();
  const { currentUser } = useSelector(AuthSelector);
  // const [clearMsgs, setClearMsgs] = useState(false);
  const [show, setShow] = useState(false);
  const rooms = useSelector(RoomsSelectors.selectAll);
  const { room } = useSelector(MessagesSelector);
  useEffect(() => {
    socket.connect();
    socket.emit("sendsocket", {
      rooms: rooms.map((room) => {
        return room._id;
      }),
      user: currentUser,
    });
  }, [rooms, currentUser]);

  const closeConvrstion = () => {
    // setMember({ _id: undefined });
    dispatch(clearAllMessages({}));
    dispatch(setRoom(null));
    // setClearMsgs(true);
  };

  const handleShow = () => setShow(true);
  return (
    // <div className="h-full flex flex-col justify-start items-center gap-2 p-2  ">
    //   <Header show={show} handleShow={handleShow}></Header>
    <Layout className="h-full">
      {currentUser !== undefined ? (
        <div className="flex flex-row p-2 gap-2 overflow-hidden h-full w-full ">
          <SideTabs />
          {room !== null ? (
            <Conversation
              closeConversation={closeConvrstion}
              isPage={false}
            ></Conversation>
          ) : (
            <div className="hidden md:flex w-full items-center justify-center h-full ">
              <Hero />
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
      {/* </div> */}
    </Layout>
  );
};

export default UserSpace;
