/* eslint-disable array-callback-return */
import { useSelector } from "react-redux";
import { AuthSelector } from "../../../features/user/authSlice";
import { getRooms, RoomsSelectors } from "../../../features/user/RoomsSlice";
import {
  MessagesSelector,
  setRoom,
} from "../../../features/Conversation/MessagesSlice";
import "./Rooms.css";
import API_URL from "~/URL";
import { useEffect, useMemo, useState } from "react";
import Input from "../../../components/Input/Input";
import { useLazyGetRoomsQuery } from "../../../services/searchApi";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../app/hooks";
import { Link } from "react-router-dom";
import { useTabsContext } from "~/contexts/TabsContext";
import { useSetCurrentMember } from "~/hooks/UserSpace/Conversation/useSetCurrentMemberName";
import ImageWithFallbackOnError from "~/components/imageWithFallbackOnError";

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
  }, [pattern, currentUser, dispatch, trigger]);
  return (
    <>
      <div className="flex flex-col items-center w-full gap-2 ">
        <h3>Contacts</h3>
        <div className="flex flex-col w-full" id="colapsedSidbar">
          <div className="!flex-col flex gap-4">
            <div className="flex flex-row justify-center">
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
                      className={`${member !== null && member._id === room_friend._id ? "bg-gradient-to-r from-primary_from/50 to-primary_to/50    hover:text-black " : " hover:text-white"} hover:bg-primary-500  justify-start items-center flex p-2 rounded-[8px]`}
                      key={index}
                      onClick={() => {
                        dispatch(setRoom(Room));
                        setShowSidebar(!showSidebar);
                        if (isPage) navigate("/room/" + Room._id);
                      }}
                    >
                      <div className="flex items-center justify-start gap-2">
                        <div className="flex items-center ">
                          {/* <PersonFill size={22}> */}

                          <ImageWithFallbackOnError
                            src={`${API_URL}/${room_friend.image}`}
                            alt={`${room_friend.username}'s avatar`}
                            width={500} height={500}
                            value={room_friend.username}
                            className="w-8 h-8 border rounded-md border-neutral-700"
                          />
                        </div>

                        <span>{room_friend.username}</span>
                      </div>
                      <br />
                    </div>
                  );
                })}
                {rooms.length === 0 && (
                  <div className="flex justify-center">No contacts found</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rooms;
