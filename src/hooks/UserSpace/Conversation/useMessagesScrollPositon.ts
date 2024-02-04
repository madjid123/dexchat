import { RefObject, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MessagesSelector } from "~/features/Conversation/MessagesSlice";
type useMessageScrollPositionProps = {
  scrollPosDivRef: RefObject<HTMLDivElement>;
};
export const useMessagesScrollPosition = ({
  scrollPosDivRef,
}: useMessageScrollPositionProps) => {
  const [scrollPos, setScrollPos] = useState(0);
  const { messagesResponse } = useSelector(MessagesSelector);
  useEffect(() => {
    if (scrollPosDivRef.current === null) return;
    // let ScroDiv = document.getElementById("scrollableDiv");
    let ScroDiv = scrollPosDivRef.current;
    ScroDiv.scrollTo({
      top: scrollPos,
      left: 0,
    });
  }, [scrollPos, scrollPosDivRef]);
  return { scrollPos, setScrollPos };
};
