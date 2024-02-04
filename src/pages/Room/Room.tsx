import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Conversation from "../../components/UserSpace/Conversation/Conversation";
import { clearAllMessages } from "../../features/Conversation/MessagesSlice";
import { MessagesSelector } from "../../features/Conversation/MessagesSlice";
import { useLazyGetMessagesByRoomIdQuery } from "../../services/MessageApi";
import { useAppDispatch } from "../../app/hooks";
type RoomProps = {};
const Room: FC<RoomProps> = (props) => {
  const dispatch = useAppDispatch();
  const closeConversation = () => {
    dispatch(clearAllMessages({}));
  };

  return (
    <Conversation
      closeConversation={closeConversation}
      isPage={true}
    ></Conversation>
  );
};
export default Room;
