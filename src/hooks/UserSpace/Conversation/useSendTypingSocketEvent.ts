import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MessagesSelector } from "~/features/Conversation/MessagesSlice";
import { Member } from "~/features/user/RoomsSlice";
import { AuthSelector } from "~/features/user/authSlice";
import socket from "~/utils/socket";
type ParamsType = {
  member: Member | null;
  message: string;
};
export const useSendTypingSocketEvent = ({ member, message }: ParamsType) => {
  const { currentUser } = useSelector(AuthSelector);
  useEffect(() => {
    if (member === null || currentUser === undefined) return;
    socket.volatile.emit("typing", {
      Sender: currentUser?.username,
      Receiver: member._id,
    });
  }, [currentUser, member, message]);
};
