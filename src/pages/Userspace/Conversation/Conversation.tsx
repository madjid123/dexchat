import { useState, useEffect, useRef } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import Button from "../../../components/Button/Button";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { AuthSelector } from "../../../features/user/authSlice";
import {
  MessagesSelector,
  Message,
  addMessage,
  clearAllMessages,
  setMessagesState,
  SendMessageToApi,
  MessagesResponse,
} from "../../../features/Conversation/MessagesSlice";
import { useAppDispatch } from "../../../app/hooks";
import {
  MessageEndPointApi,
  useGetMessagesByRoomIdQuery,
  useLazyGetMessagesByRoomIdQuery,
} from "../../../services/MessageApi";
import "./Conversation.css";
import "react-bootstrap";
import { useCallback } from "react";
import socket from "../../../utils/socket";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFetchMessages } from "../../../hooks/useFetchMessages";
import { reactHooksModuleName } from "@reduxjs/toolkit/dist/query/react/module";
import { Input } from "../../../components/Input/Input";
interface ConversationProps {
  clearMsgs: boolean;
  setClearMsgs(arg0: boolean): void;
  member: any;
  CurrentRoomId: string;
}

function Conversation(props: ConversationProps) {
  const { currentUser } = useSelector(AuthSelector);
  const { messagesResponse } = useSelector(MessagesSelector);
  const [member, setMember] = useState(props.member);
  const [message, setMessage] = useState("" as string);
  const [scrollPos, setScrollPos] = useState(0);
  const dispatch = useAppDispatch();
  const [trigger, result] =
    MessageEndPointApi.endpoints.getMessagesByRoomId.useLazyQuery({});
  // if (result.data !== undefined) {
  // messagesResponse = result.data
  // console.log(messagesResponse)
  // }
  // const getMessage = useCallback(() => {
  //     socket.on("getmsg", (data) => {
  //         const _message: Message = data.message;

  //         dispatch(addMessage(_message));
  //     });
  // }, []);
  const onMessage = () => {
    if (message === "") return;
    if (socket.connected && currentUser !== undefined) {
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
        id: currentUser?._id,
      };

      dispatch(
        MessageEndPointApi.endpoints.getMessagesByRoomId.initiate(
          { room_id: props.CurrentRoomId, page: 1 },
          { forceRefetch: true }
        )
      );

      let ScroDiv = document.getElementById("scrollableDiv");
      ScroDiv?.addEventListener("scroll", (e) => {});
    }
  }, [currentUser, dispatch, props.CurrentRoomId, socket]);
  useEffect(() => {
    //getMessage();
    trigger({ room_id: props.CurrentRoomId, page: 1 });
    socket.on("typing", (args: string) => {
      console.log(args, "is typing");
    });
  }, []);
  useEffect(() => {
    socket.volatile.emit("typing", {
      Sender: currentUser?.username,
      Receiver: member._id,
    });
  }, [currentUser?.username, member._id, message]);

  const fetchMessages = () => {
    let ScroDiv = document.getElementById("scrollableDiv");
    if (ScroDiv?.scrollTop !== undefined) {
      setScrollPos(ScroDiv?.scrollTop);
    }
    setTimeout(() => {
      if (result.data !== undefined) {
        let page = result.data.page;

        if (page !== undefined && page + 1 > result.data.pages) return;
        else page += 1;

        trigger({ room_id: props.CurrentRoomId, page: page });
      }
    }, 1000);
  };
  useEffect(() => {
    console.log(scrollPos);
    let ScroDiv = document.getElementById("scrollableDiv");
    ScroDiv?.scrollTo({
      top: scrollPos,
      left: 0,
    });
  }, [scrollPos, messagesResponse?.page]);
  return (
    <div
      className="conversation"
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          onMessage();
        }
      }}
    >
      {" "}
      <div
        className="conversation-header"
        style={{
          boxShadow: "0 0 30px 5px #0006",
          padding: "0.5rem",
          borderRadius: "1.5rem 1.5rem 0.5rem 0.5rem",
        }}
      >
        <h2 style={{ position: "sticky" }}>{props.member.username}</h2>
      </div>
      <div
        id="scrollableDiv"
        style={{
          height: "80%",
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column-reverse",
        }}
        onScroll={(e) => {
          e.preventDefault();
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
          //initialScrollY={-10}
          endMessage={
            <div>
              {" "}
              <hr></hr>
            </div>
          }
          scrollableTarget="scrollableDiv"
          style={{ display: "flex", flexDirection: "column-reverse" }}
          inverse={true}
          scrollThreshold={"80%"}
          onScroll={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <ListGroup>
            {messagesResponse.messages.map((msg: Message, index) => {
              return (
                <ListGroup.Item
                  bsPrefix={"alksdjf"}
                  variant="dark"
                  key={index}
                  className="MessageItem"
                  style={{ backgroundColor: "inherit", border: "none" }}
                >
                  <div className="message">
                    <div
                      className={
                        msg.Sender.username === currentUser?.username
                          ? "message-bull user-bull"
                          : "message-bull member-bull"
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
        <Input
          className="footer-input "
          onChange={(e: any) => {
            setMessage(e.target.value);
          }}
          value={message}
          variant="dark"
        ></Input>
        <Button
          className="footer-button form-input px-3 mx-2"
          onClick={() => {
            onMessage();
          }}
        >
          Send
        </Button>
      </footer>
    </div>
  );
}
export default Conversation;
export const _socket = socket;
