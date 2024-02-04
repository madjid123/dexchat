import {
  createSlice,
  createAsyncThunk,
  Reducer,
  PayloadAction,
} from "@reduxjs/toolkit";
import { MessageEndPointApi } from "../../services/MessageApi";
import { RootState } from "../../app/store";
import axios from "axios";
import URL from "../../URL";
import { Room } from "../user/RoomsSlice";
import { useSelector } from "react-redux";

export interface Message {
  Sender: {
    id: string;
    username: string;
  };
  Receiver: {
    id: string;
    username: string;
  };
  Room: {
    id: string;
    username?: string;
  };
  content: {
    text: string;
  };
  SentAt: Date;
  createdAt: Date;
}
export interface MessagesResponse {
  messages: Message[];
  page: number;
  pages: number;
}
export interface MessagesState {
  messagesResponse: MessagesResponse;
  errors: string[];
  room: Room | null;
}
const initialState: MessagesState = {
  messagesResponse: {
    messages: [],
    page: 1,
    pages: 1,
  },
  errors: [],
  room: null,
};

export const SendMessageToApi = createAsyncThunk<
  void,
  { message: Message; room_id: string }
>("message/send", async ({ message, room_id }) => {
  try {
    await axios.post(URL + "/room/" + room_id + "/send/message", message, {
      withCredentials: true,
    });
  } catch (err) {
    const error = err as Error;
    console.error(error);
  }
});

const MessagesReducer = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, { payload }: { payload: Message }) => {
      state.messagesResponse.messages = [
        ...state.messagesResponse.messages,
        payload,
      ];
    },
    clearAllMessages: (state, payload) => {
      state.messagesResponse = {
        messages: [],
        page: 1,
        pages: 1,
      };
    },
    setMessagesState: (state, { payload }: { payload: MessagesResponse }) => {
      state.messagesResponse = payload;
    },
    setRoom(state, action: PayloadAction<Room | null>) {
      state.messagesResponse = initialState.messagesResponse;
      // if (state.room != null)
      // 	socket.removeListener("getmsg:" + state.room._id);

      state.room = action.payload;
    },
  },
  extraReducers: (bulider) => {
    bulider.addMatcher(
      MessageEndPointApi.endpoints.getMessagesByRoomId.matchFulfilled,
      (state, action) => {
        if (state.messagesResponse.messages.length === 0) {
          state.messagesResponse = action.payload.messagesResponse;
          state.room = action.payload.room;
        } else {
          let payload: MessagesState = action.payload;
          payload.messagesResponse.messages = [
            ...payload.messagesResponse.messages,
            ...state.messagesResponse.messages,
          ];

          return payload;
        }
      }
    );
    bulider.addMatcher(
      MessageEndPointApi.endpoints.getMessagesByRoomId.matchRejected,
      (state, action) => {
        if (action.error.message !== undefined)
          state.errors.push(action.error.message);
      }
    );
  },
});

const { actions } = MessagesReducer;
export const { addMessage, clearAllMessages, setMessagesState, setRoom } =
  actions;
export const MessagesSelector = (state: RootState) => state.MessagesReducer;
export const useMessagesSelector = () => useSelector(MessagesSelector);
export default MessagesReducer.reducer as Reducer<typeof initialState>;
