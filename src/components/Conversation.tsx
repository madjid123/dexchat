import { useState, useEffect, useRef } from "react";
import { Button, ListGroup, Spinner } from "react-bootstrap";
import { io } from "socket.io-client";
import { Menu, MenuItem } from "react-pro-sidebar";
import { useSelector } from "react-redux";
import { AuthSelector } from "../features/user/authSlice";
import {
  MessagesSelector,
  Message,
  addMessage,
  clearAllMessages,
  setMessagesState,
  SendMessageToApi,
  LoadMessages,
} from "../features/Conversation/MessagesSlice";
import { useAppDispatch } from "../app/hooks";
import {
  MessageEndPointApi,
  useGetMessagesByRoomIdQuery,
  useLazyGetMessagesByRoomIdQuery,
} from "../services/MessageApi";
import "./Conversation.css";
import "react-bootstrap";
import { useCallback } from "react";
import socket from "../utils/socket";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFetchMessages } from "../hooks/useFetchMessages";
interface ConversationProps {
  clearMsgs: boolean;
  setClearMsgs(arg0: boolean): void;
  member: any;
  CurrentRoomId: string;
}

function Conversation(props: ConversationProps) {
  const { currentUser } = useSelector(AuthSelector);
  const { messagesResponse } = useSelector(MessagesSelector);
  const { messages } = messagesResponse;
  const [member, setMember] = useState(props.member);
  const [message, setMessage] = useState("" as string);
  const dispatch = useAppDispatch();
  const ScrollableDivRef = useRef();
  const [trigger, result, LastPromiseIngo] =
    MessageEndPointApi.endpoints.getMessagesByRoomId.useLazyQuery({});

  const getMessage = useCallback(() => {
    socket.on("getmsg", (data) => {
      console.log(data);
      const _message: Message = data.message;

      dispatch(addMessage(_message));
      console.log(messages);
    });
  }, []);
  const onMessage = () => {
    if (message === "") return;
    if (socket.connected && currentUser !== undefined) {
      const { _id, name } = currentUser;
      const _message: Message = {
        Receiver: {
          username: member.name,
          id: member._id,
        },
        Sender: {
          username: name,
          id: _id,
        },
        Room: {
          id: props.CurrentRoomId,
        },
        content: {
          text: message,
        },
        SentAt: new Date(),
      };
      socket.emit("sendmsg", {
        message: _message,
      });
      dispatch(addMessage(_message));
      dispatch(
        SendMessageToApi({ message: _message, room_id: props.CurrentRoomId })
      );
      setMessage("");
    }
  };

  useEffect(() => {
    setMember(props.member);
    if (props.clearMsgs === true) {
      props.setClearMsgs(false);
      clearAllMessages(null);
    }
  }, [props.member, props]);
  useEffect(() => {
    if (currentUser !== undefined) {
      let user = {
        ...currentUser,
        id: currentUser._id.toString(),
      };
      socket.emit("sendusr", { user: user, roomId: socket.id });
      // dispatch(LoadMessages(props.CurrentRoomId as string))
      console.log(props.CurrentRoomId);
      dispatch(
        MessageEndPointApi.endpoints.getMessagesByRoomId.initiate(
          { room_id: props.CurrentRoomId, page: 1 },
          { forceRefetch: true }
        )
      );
      //trigger(props.CurrentRoomId)
    }
  }, [currentUser, dispatch, props.CurrentRoomId]);
  useEffect(() => {
    getMessage();
  }, [getMessage]);

  const fetchMessages = () =>
    setTimeout(() => {
      console.log({
        room_id: props.CurrentRoomId,
        page: messagesResponse.page + 1,
      });
      let page = messagesResponse.page;
      if (page + 1 > messagesResponse.pages) return;
      else page += 1;

      trigger({ room_id: props.CurrentRoomId, page: page });
    }, 1000);
  return (
    <div
      className="conversation"
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          onMessage();
          console.log("Enter");
        }
      }}
    >
      <h1>{props.member.name}</h1>

      <div
        id="scrollableDiv"
        style={{
          height: "80%",
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column-reverse",
          scrollBehavior: "smooth",
        }}
        // ref={ScrollableDivRef}
      >
        <InfiniteScroll
          dataLength={messagesResponse.messages.length}
          next={fetchMessages}
          hasMore={
            messagesResponse.page < messagesResponse.pages ? true : false
          }
          loader={
            <div
              style={{
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <Spinner animation="grow" variant="light" />
            </div>
          }
          endMessage={
            <div>
              {" "}
              <hr></hr>
            </div>
          }
          scrollableTarget="scrollableDiv"
          style={{ display: "flex", flexDirection: "column-reverse" }}
          inverse={true}
          //height="auto"
          onScroll={(e: React.MouseEvent | React.SyntheticEvent) => {
            const event = e as React.SyntheticEvent;
            const position = event.currentTarget?.getBoundingClientRect();
            console.log(position.y);
          }}
        >
          <ListGroup>
            {messagesResponse.messages.map((msg: Message, index) => {
              return (
                <ListGroup.Item
                  variant="dark"
                  key={index}
                  className="MessageItem"
                  style={{ backgroundColor: "inherit" }}
                >
                  <div className="message">
                    <div
                      className={
                        msg.Sender.username === currentUser?.name
                          ? "my-message-bull"
                          : "other-message-bull"
                      }
                    >
                      <div></div>
                      <label>{msg.content.text}</label>
                    </div>
                    <br></br>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </InfiniteScroll>
      </div>
      <footer className="footer">
        <div style={{ width: "100%" }} className="footer">
          <input
            className="footer-input"
            type="text"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          ></input>
          <Button
            className="footer-button form-input"
            style={{}}
            onClick={() => {
              onMessage();
            }}
          >
            Send
          </Button>
        </div>
      </footer>
    </div>
  );
}
export default Conversation;
export const _socket = socket;
