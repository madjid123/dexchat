import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Message,
  addMessage,
  MessagesState,
} from '../features/Conversation/MessagesSlice';
import URL from '../URL';
import { store } from '../app/store';
import socket from '../utils/socket';
import { Room } from '~/features/user/RoomsSlice';

export const MessageEndPointApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL, credentials: 'include' }),
  tagTypes: ['Message'],

  endpoints: (builder) => ({
    getMessagesByRoomId: builder.query<
      MessagesState,
      { room_id: string; page: number }
    >({
      query: (args) => ({
        url: `messages/room/${args.room_id}?page=${args.page}`,
      }),
      transformResponse: (rawResult) => {
        const result = rawResult as MessagesState;

        return result;
      },

      keepUnusedDataFor: 30,
      onQueryStarted: async () => {
        try {
        } catch (err) {
          console.error(err);
        }
      },
      onCacheEntryAdded: async (args, api) => {
        // create a websocket connection when the cache subscription starts
        try {
          socket.connect();
          await api.cacheDataLoaded;
          const room: Room | null = store.getState().MessagesReducer.room;
          const listener = (data: { message: Message; room: string }) => {
            api.updateCachedData((draft) => {
              if (room !== null && room._id !== data.room) return;
              // draft.messagesResponse.messages.push(data.message)
              store.dispatch(addMessage(data.message));
              // return draft
            });
          };
          if (room != null) {
            socket.on(`getmsg:${room._id}`, listener);
          }
        } catch (e) {
          console.error((e as Error).message);
        }
        await api.cacheEntryRemoved;
      },
    }),
  }),
});
export const { useGetMessagesByRoomIdQuery, useLazyGetMessagesByRoomIdQuery } =
  MessageEndPointApi;
