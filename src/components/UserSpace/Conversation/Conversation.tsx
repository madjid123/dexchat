import Button from "../../Button/Button";
import { useSelector } from "react-redux";
import { AuthSelector } from "../../../features/user/authSlice";
import { Comment } from "react-loader-spinner";
import {
  Message,
  setRoom
} from "../../../features/Conversation/MessagesSlice";
import { useAppDispatch } from "../../../app/hooks";
import "./Conversation.css";
import socket from "../../../utils/socket";
import InfiniteScroll from "react-infinite-scroll-component";
import Input from "~/components/Input/Input";
import { useSetCurrentMember } from "~/hooks/UserSpace/Conversation/useSetCurrentMemberName";
import { useOnMessageChanges } from "~/hooks/UserSpace/Conversation/useOnMessageChanges";
import { useMessagesScrollPosition } from "~/hooks/UserSpace/Conversation/useMessagesScrollPositon";
import { useFetchMessages } from "~/hooks/UserSpace/Conversation/useFetchMessages";
import { SendHorizonal, X } from "lucide-react";
import React, { useRef } from "react";
import { useTabsContext } from "~/contexts/TabsContext";


interface ConversationProps {
  closeConversation(): void;
  isPage: boolean;
}

const Conversation = (props: ConversationProps) => {
  const { currentUser } = useSelector(AuthSelector);
  const { member, setMember } = useSetCurrentMember();
  const { message, setMessage, onSubmitMessage } = useOnMessageChanges({
    member,
  });
  const { showSidebar, setShowSidebar } = useTabsContext();
  const scrollPosDivRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { setScrollPos } = useMessagesScrollPosition({ scrollPosDivRef });

  const { messagesResponse, fetchMessages } = useFetchMessages({
    setScrollPos,
    scrollPosDivRef,
    member,
  });
  return (
    <div
      className="conversation    h-full shadow-[0px_0px_10px_0px] shadow-primary-500/50 hover:shadow-primary-500/90"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSubmitMessage();
          setScrollPos(0);
        }
      }}
    >
      <div
        className="conversation-header"
        style={{
          padding: "1rem",
          borderRadius: "1.5rem 1.5rem 0.5rem 0.5rem",
        }}
      >
        <p></p>
        <h2 className="sticky m-0 w-fit">
          {member !== null && member.username}
        </h2>
        {!props.isPage ? (
          <Button
            onClick={(e) => {
              e.preventDefault()
              props.closeConversation();
              dispatch(setRoom(null));
              setMember(null);
              setShowSidebar(!showSidebar);
            }}
            type="submit"
            // value="X"
            className="!p-1"
            variant="danger"
          >
            <X size={16} className="w-4 font-bold" strokeWidth={4} />
          </Button>
        ) : (
          <p></p>
        )}
      </div>

      <div
        id="scrollableDiv"
        ref={scrollPosDivRef}
        className="flex flex-col-reverse overflow-y-scroll "
        onScroll={(e) => {
          e.preventDefault();
        }}
      >
        <InfiniteScroll
          dataLength={messagesResponse.messages.length}
          next={fetchMessages}
          hasMore={
            messagesResponse.page < messagesResponse.pages ? true : false
          }
          loader={
            <div className="flex items-center justify-center text-center">
              {/* <Spinner animation="grow" variant="light" /> */}
              <Comment
                wrapperClass="color-green-500 !fill-green-500"
                backgroundColor="rgb(0,200,100)"
                width={50}
                height={50}
              />
            </div>
          }
          endMessage={
            <div>
              <div className="h-[1px]  bg-slate-600 "></div>
            </div>
          }
          scrollableTarget="scrollableDiv"
          className="flex flex-col-reverse gap-2"
          inverse={true}
          scrollThreshold={"80%"}
          onScroll={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div
            id="scrollableDiv"
            className="flex flex-col w-full gap-2 overflow-scroll"
          >
            {messagesResponse.messages.map((msg: Message, index) => {
              function manualDateFormat(date: Date) {
                const day = date.getDate();
                const month = date.getMonth() + 1; // Months are zero-based
                const year = date.getFullYear();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                return `${month}/${day}/${year}`;
              }
              const manualHourFormat = (date: Date) => {
                const minutes = date.getMinutes().toString().padStart(2, "0");
                return `${date.getHours()}:${minutes}`;
              };

              const prevMsg = messagesResponse.messages[index - 1];
              const showHour =
                !prevMsg ||
                new Date(prevMsg.createdAt).getHours() !==
                new Date(msg.createdAt).getHours();
              const showDate =
                !prevMsg ||
                new Date(prevMsg.createdAt).getDate() !==
                new Date(msg.createdAt).getDate();

              return (
                <React.Fragment key={index}>
                  {showDate && (
                    <div className="text-xs text-neutral-300">
                      {manualDateFormat(new Date(msg.createdAt))}
                    </div>
                  )}
                  {showHour && (
                    <div className="text-xs text-neutral-400">
                      {manualHourFormat(new Date(msg.createdAt))}
                    </div>
                  )}
                  <div
                    className={`message relative w-full flex px-2 ${msg.Sender.username === currentUser?.username
                      ? "justify-start"
                      : "justify-end"
                      }`}
                  >
                    <div
                      className={`lg:max-w-[40%] w-fit rounded-[8px] md:px-4 p-2 flex items-end text-xs ${msg.Sender.username === currentUser?.username
                        ? "from-primary_to/50 to-primary_from/50 bg-gradient-to-r"
                        : "bg-neutral-500/40"
                        }`}
                    >
                      <label>{msg.content.text}</label>
                    </div>
                    <br />
                  </div>
                </React.Fragment>
              );
            })}
          </div>

        </InfiniteScroll>
      </div>
      <footer className="footer">
        <Input
          className="footer-input border-white/10 focus:border-tertiary-500 "
          onChange={(e: any) => {
            setMessage(e.target.value);
          }}
          value={message}
          variant="dark"
        ></Input>
        <Button
          className="rounded-lg !p-1.5 !px-3 md:px-3 mx-2 !bg-emerald-500  hover:shadow-white/70 shadow-md !text-white fill-white"
          onClick={() => {
            onSubmitMessage();
          }}
        >
          <SendHorizonal />
        </Button>
      </footer>
    </div>
  );
};
export default Conversation;
export const _socket = socket;
