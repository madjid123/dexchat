/* eslint-disable array-callback-return */
import { Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AuthSelector } from "../../../features/user/authSlice";
import { getRooms, RoomsSelectors } from "../../../features/user/RoomsSlice";
import {
  MessagesSelector,
  setRoom,
} from "../../../features/Conversation/MessagesSlice";
import "./Rooms.css";

import { useEffect, useMemo, useState } from "react";
import Input from "../../../components/Input/Input";
import { PersonFill } from "react-bootstrap-icons";
import { useLazyGetRoomsQuery } from "../../../services/searchApi";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../app/hooks";
import { Link } from "react-router-dom";
import { useTabsContext } from "~/contexts/TabsContext";
import { useSetCurrentMember } from "~/hooks/UserSpace/Conversation/useSetCurrentMemberName";

type RoomsProps = {
  isPage?: boolean;
};
export interface Room {
  members: any[2];
}
const Rooms = ({ isPage = false }: RoomsProps) => {
  const dispatch = useAppDispatch();
  const rooms = useSelector(RoomsSelectors.selectAll);
  const { room } = useSelector(MessagesSelector);
  const { currentUser, isAuth } = useSelector(AuthSelector);
  const [pattern, setPattern] = useState("");
  const navigate = useNavigate();
  const [trigger] = useLazyGetRoomsQuery({ pollingInterval: 3000 });
  const { setShowSidebar, showSidebar } = useTabsContext();
  const { member } = useSetCurrentMember();

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setPattern(target.value);
  };
  useEffect(() => {
    let id = undefined;
    if (currentUser !== undefined) {
      id = currentUser._id;
      if (pattern.length === 0) dispatch(getRooms({ id: id }));
      else trigger({ pattern: pattern, user_id: currentUser._id });
    }
  }, [isAuth, pattern, currentUser, dispatch, trigger]);
  return (
    <>
      <div className=" flex-col flex items-center gap-2 ">
        <h3>Contacts</h3>
        {/* <Navbar.Toggle formTarget="colapsedSidbar" /> */}
        <div className="flex flex-col" id="colapsedSidbar">
          <div className="!flex-col flex gap-4">
            <div className="flex-row flex ">
              <Input
                placeholder="Search in your contacts"
                style={{ width: "90%", fontSize: "12px" }}
                variant="dark"
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="flex flex-col gap-1 ">
                {rooms.map((Room, index: number) => {
                  const room_friend = Room.members.find(
                    (value) => value._id !== currentUser?._id
                  );
                  if (room_friend === undefined) return <></>;
                  return (
                    <div
                      // href={`/room/${Room._id}`}
                      // to={`/room/${Room._id}`}
                      className={`${member !== null && member._id === room_friend._id ? "bg-gradient-to-r from-purple-500/70  to-blue-500/70" : ""} hover:text-gray-400 hover:bg-gray-700 justify-start items-center flex p-2 rounded-[8px]`}
                      key={index}
                      onClick={() => {
                        // if (room === null) dispatch(setRoom(Room));
                        // else if (Room._id !== room._id) {
                        dispatch(setRoom(Room));
                        // }
                        setShowSidebar(!showSidebar);
                        if (isPage) navigate("/room/" + Room._id);
                      }}
                    >
                      <div className="flex items-center   justify-start">
                        <div className="mx-1 flex items-center">
                          <PersonFill size={22}></PersonFill>
                        </div>

                        <span>{room_friend.username}</span>
                      </div>
                      <br />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rooms;
