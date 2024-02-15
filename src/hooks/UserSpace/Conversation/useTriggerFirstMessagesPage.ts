import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MessagesSelector, clearAllMessages } from "../../../features/Conversation/MessagesSlice";
import socket from "../../../utils/socket";
import { MessageEndPointApi } from "../../../services/MessageApi";
import { Member, getRooms } from "~/features/user/RoomsSlice";
import { useAppDispatch } from "~/app/hooks";
import { useAuthSelector } from "~/features/user/authSlice";
export const useTriggerFirstMessagesPage = ({
  member,
}: {
  member: Member | null;
}) => {
  const { room, messagesResponse } = useSelector(MessagesSelector);
  const dispatch = useAppDispatch();
  const [trigger] =
    MessageEndPointApi.endpoints.getMessagesByRoomId.useLazyQuery({});
    const {currentUser} = useAuthSelector()
  useEffect(() => {
    
    if (room === null) return;
    if (messagesResponse.messages.length > 0) return;
    trigger({ room_id: room._id, page: 1 });
    socket.on("typing", (args: string) => { });
  }, []);
  useEffect(()=>{
    if(messagesResponse.messages.length ===0  && room !== null && messagesResponse.pages === 1){
      trigger({room_id : room._id, page : 1})
    }
  },[room])

};
