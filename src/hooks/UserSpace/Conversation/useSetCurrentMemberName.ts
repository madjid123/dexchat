import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MessagesSelector } from '../../../features/Conversation/MessagesSlice';
import { Member } from '../../../features/user/RoomsSlice';
import socket from '../../../utils/socket';
import { AuthSelector } from '../../../features/user/authSlice';
export const useSetCurrentMember = () => {
  const [member, setMember] = useState<Member | null>(null);
  const { room } = useSelector(MessagesSelector);
  const { currentUser } = useSelector(AuthSelector);
  useEffect(() => {
    if (room !== null) {
      socket.emit('sendsocket', { rooms: [room._id] });
      room.members.forEach((Member) => {
        if (currentUser && Member._id !== currentUser?._id) {
          setMember(Member);
        }
      });
    } else {
      setMember(null);
    }
  
  }, [room, currentUser]);
  return { member, setMember };
};
