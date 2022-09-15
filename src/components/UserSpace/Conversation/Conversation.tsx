import { useState, useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Spinner } from "react-bootstrap";
import Button from "../../Button/Button";
import { useSelector } from "react-redux";
import { AuthSelector } from "../../../features/user/authSlice";
import {
  MessagesSelector,
  Message,
  addMessage,
  SendMessageToApi,
  setRoom,
} from "../../../features/Conversation/MessagesSlice";
import { useAppDispatch } from "../../../app/hooks";
import {
  MessageEndPointApi,
} from "../../../services/MessageApi";
import "./Conversation.css";
import "react-bootstrap";
import socket from "../../../utils/socket";
import InfiniteScroll from "react-infinite-scroll-component";
import Input from "../../Input/Input";
import {
  Member,
  Room,
  RoomsSelectors,
} from "../../../features/user/RoomsSlice";
import { Dictionary } from "@reduxjs/toolkit";
import { X, XCircleFill, XLg } from "react-bootstrap-icons";
import useInfiniteScroll from 'react-infinite-scroll-hook'


interface ConversationProps {
  closeConversation(): void;
  isPage: boolean;
}

const Conversation = (props: ConversationProps) => {
  const { currentUser } = useSelector(AuthSelector);
  const { messagesResponse, room } = useSelector(MessagesSelector);
  const [member, setMember] = useState<Member | null>(null);
  const [message, setMessage] = useState("" as string);
  const [scrollPos, setScrollPos] = useState(0);
  const dispatch = useAppDispatch();
  const [trigger, result] =
    MessageEndPointApi.endpoints.getMessagesByRoomId.useLazyQuery({});

  const onMessage = () => {
    if (message === "") return;
    if (socket.connected && currentUser !== undefined && room !== null && member !== null) {
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
      };
      socket.emit("sendmsg", {
        message: _message,
      });
      dispatch(addMessage(_message));
      dispatch(SendMessageToApi({ message: _message, room_id: room._id }));
      setMessage("");
    }
  };
  useEffect(() => {
    if (room !== null) {
      socket.emit("sendsocket", { rooms: [room._id] })
      room.members.map((Member) => {
        if (currentUser && Member._id !== currentUser?._id) {
          setMember(Member);
        }
      });
    }
  }, [room]);
  useEffect(() => {
    if (currentUser !== undefined) {
      let user = {
        ...currentUser,
        id: currentUser?._id,
      };

      let ScroDiv = document.getElementById("scrollableDiv");
      ScroDiv?.addEventListener("scroll", (e) => { });
    }
  }, [currentUser, dispatch, , socket]);
  useEffect(() => {
    let page = 1;

    if (messagesResponse.messages.length > 0) {
      // dispatch(setMessagesState(messages));
    } else {
      if (room !== null)
        trigger({ room_id: room._id, page: 1 });
    }
    socket.on("typing", (args: string) => {
    });
  }, [room !== null]);
  useEffect(() => {
    if (member != null)
      socket.volatile.emit("typing", {
        Sender: currentUser?.username,
        Receiver: member._id,
      });
  }, [currentUser?.username, member, message]);

  const fetchMessages = () => {
    let ScroDiv = document.getElementById("scrollableDiv");
    if (ScroDiv?.scrollTop !== undefined) {
      setScrollPos(ScroDiv?.scrollTop);
    }
    setTimeout(() => {
      let page = messagesResponse.page;

      if (page !== undefined && page + 1 > messagesResponse.pages) return;
      else page += 1;
      if (room != null)
        trigger({ room_id: room._id, page: page });
    }, 1000);
  };
  useEffect(() => {
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
      <div
        className="conversation-header"
        style={{
          padding: "0.5rem",
          borderRadius: "1.5rem 1.5rem 0.5rem 0.5rem",
        }}
      >
        <p></p>
        <h2
          style={{
            position: "sticky",
            width: "fit-content",
          }}
          className="m-0"
        >
          {
            (room !== null && room.members.find((member) => {
              if (currentUser)
                return member._id != currentUser._id
            })?.username)}
        </h2>
        {(!props.isPage) ?
          <Button
            onClick={() => {
              props.closeConversation();
              dispatch(setRoom(null))
              setMember(null)
            }}
            type="submit"
            value="X"
            variant="danger"
          >
            <X />
          </Button>
          : <p></p>
        }
      </div>
      <div
        id="scrollableDiv"
        style={{
          // height: "100vh",
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column-reverse",
        }}
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
          <ListGroup id="scrollableDiv" style={{ height: "50vh" }}>
            {messagesResponse.messages.map((msg: Message, index) => {
              return (
                <ListGroup.Item
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
          className="footer-button px-3 mx-2"
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
