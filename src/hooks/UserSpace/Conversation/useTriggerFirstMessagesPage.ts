import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MessagesSelector } from "../../../features/Conversation/MessagesSlice";
import socket from "../../../utils/socket";
import { MessageEndPointApi } from "../../../services/MessageApi";
import { Member } from "~/features/user/RoomsSlice";
export const useTriggerFirstMessagesPage = ({
  member,
}: {
  member: Member | null;
}) => {
  const { room, messagesResponse } = useSelector(MessagesSelector);
  const [trigger] =
    MessageEndPointApi.endpoints.getMessagesByRoomId.useLazyQuery({});
  useEffect(() => {
    // if (messagesResponse.messages.length > 0) {
    // } else {
    if (room === null) return;
    if (messagesResponse.messages.length > 0) return;
    trigger({ room_id: room._id, page: 1 });
    // }
    socket.on("typing", (args: string) => { });
  }, []);
  useEffect(() => {
    if (room === null) return;
    if (messagesResponse.messages.length > 0) return;
    trigger({ room_id: room._id, page: 1 });

  }, [member, room])
};
