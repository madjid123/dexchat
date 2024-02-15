import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "~/app/hooks";
import {
  Message,
  MessagesSelector,
  SendMessageToApi,
  addMessage,
} from "~/features/Conversation/MessagesSlice";
import { Member } from "~/features/user/RoomsSlice";
import { AuthSelector } from "~/features/user/authSlice";
import socket from "~/utils/socket";
import { useSendTypingSocketEvent } from "./useSendTypingSocketEvent";
export const useOnMessageChanges = ({ member }: { member: Member | null }) => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("" as string);
  useSendTypingSocketEvent({ member, message });
  const { currentUser } = useSelector(AuthSelector);
  const { room } = useSelector(MessagesSelector);
  const onSubmitMessage = () => {
    if (message === "") return;
    socket.connect()
    if (
      socket.connected &&
      currentUser !== undefined &&
      room !== null &&
      member !== null
    ) {
      const { _id, username } = currentUser;
      const _message: Message = {
        Receiver: {
          username: member.username,
          id: member._id,
        },
        Sender: {
          username: username,
          id: _id,
        },
        Room: {
          id: room._id,
        },
        content: {
          text: message,
        },
        SentAt: new Date(),
        createdAt: new Date(),
      };
      socket.emit("sendmsg", {
        message: _message,
      });
      dispatch(addMessage(_message));
      dispatch(SendMessageToApi({ message: _message, room_id: room._id }));
      setMessage("");
    }
  };
  return { message, setMessage, onSubmitMessage };
};
