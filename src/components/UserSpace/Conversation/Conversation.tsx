import { ListGroup, Spinner } from "react-bootstrap";
import Button from "../../Button/Button";
import { useSelector } from "react-redux";
import { AuthSelector } from "../../../features/user/authSlice";
import { Comment } from "react-loader-spinner";
import {
  MessagesSelector,
  Message,
  setRoom,
} from "../../../features/Conversation/MessagesSlice";
import { useAppDispatch } from "../../../app/hooks";
import "./Conversation.css";
import "react-bootstrap";
import socket from "../../../utils/socket";
import InfiniteScroll from "react-infinite-scroll-component";
import Input from "~/components/Input/Input";
import { X } from "react-bootstrap-icons";
import { useSetCurrentMember } from "~/hooks/UserSpace/Conversation/useSetCurrentMemberName";
import { useSendTypingSocketEvent } from "~/hooks/UserSpace/Conversation/useSendTypingSocketEvent";
import { useOnMessageChanges } from "~/hooks/UserSpace/Conversation/useOnMessageChanges";
import { useMessagesScrollPosition } from "~/hooks/UserSpace/Conversation/useMessagesScrollPositon";
import { useFetchMessages } from "~/hooks/UserSpace/Conversation/useFetchMessages";
import { SendHorizonal } from "lucide-react";
import { useRef } from "react";
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
      className="conversation   shadow-black h-full shadow-[0_0px_10px_0] hover:shadow-primary-500"
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
        <h2 className="m-0 w-fit sticky">
          {member !== null && member.username}
        </h2>
        {!props.isPage ? (
          <Button
            onClick={() => {
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
            <X />
          </Button>
        ) : (
          <p></p>
        )}
      </div>
      <div
        id="scrollableDiv"
        ref={scrollPosDivRef}
        className=" overflow-y-scroll flex flex-col-reverse "
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
            <div className="items-center text-center justify-center flex">
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
          className="flex gap-2 flex-col-reverse"
          inverse={true}
          scrollThreshold={"80%"}
          onScroll={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div
            id="scrollableDiv"
            // style={{ height: "fit-content" }}
            className="gap-2 flex flex-col w-full overflow-scroll "
          >
            {messagesResponse.messages.map((msg: Message, index) => {
              return (
                <div
                  // variant="dark"
                  key={index}
                  className="MessageItem "
                  style={{ backgroundColor: "inherit", border: "none" }}
                >
                  <div
                    className={`message relative w-full 
                        flex 
                        px-2
                        ${
                          msg.Sender.username === currentUser?.username
                            ? "justify-start "
                            : "  justify-end "
                        }
                   `}
                  >
                    <div
                      className={`
                        lg:max-w-[40%] w-fit rounded-[8px] p-2 flex items-end 
                        text-xs
                        ${
                          msg.Sender.username === currentUser?.username
                            ? " from-emerald-500 to-blue-500 bg-gradient-to-tr "
                            : "bg-neutral-600  "
                        }
                      `}
                    >
                      <label>{msg.content.text}</label>
                    </div>
                    <br></br>
                  </div>
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
      <footer className="footer">
        <Input
          className="footer-input border-white/10 focus:border-tertiary-500  "
          onChange={(e: any) => {
            setMessage(e.target.value);
          }}
          value={message}
          variant="dark"
        ></Input>
        <Button
          className="footer-button !rounded-xl !px-2 md:px-3 mx-2"
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
