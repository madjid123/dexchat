import { RefObject, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMessagesSelector } from "~/features/Conversation/MessagesSlice";
import { MessageEndPointApi } from "~/services/MessageApi";
import { useTriggerFirstMessagesPage } from "./useTriggerFirstMessagesPage";
import { useSetCurrentMember } from "./useSetCurrentMemberName";
import { Member } from "~/features/user/RoomsSlice";
type HookType = {
  setScrollPos(sp: number): void;
  scrollPosDivRef: RefObject<HTMLDivElement>;
  member: Member | null;
};
export const useFetchMessages = ({
  setScrollPos,
  scrollPosDivRef,
  member,
}: HookType) => {
  useTriggerFirstMessagesPage({ member });
  const { messagesResponse, room } = useMessagesSelector();
  const [trigger] =
    MessageEndPointApi.endpoints.getMessagesByRoomId.useLazyQuery({});
  const fetchMessages = () => {
    // let ScroDiv = document.getElementById("scrollableDiv");
    // if (ScroDiv?.scrollTop !== undefined) {
    //   setScrollPos(ScroDiv?.scrollTop);
    // }
    if (scrollPosDivRef.current !== null) {
      console.log(scrollPosDivRef.current.scrollTop);
      setScrollPos(scrollPosDivRef.current.scrollTop);
    }
    let currentScrollPos = scrollPosDivRef.current?.scrollTop;
    setTimeout(() => {
      let page = messagesResponse.page;

      if (page !== undefined && page + 1 > messagesResponse.pages) return;
      else page += 1;
      if (room != null) trigger({ room_id: room._id, page: page });
      setScrollPos(currentScrollPos as number);
    }, 2000);
  };
  return { messagesResponse, fetchMessages };
};
