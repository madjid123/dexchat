import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Message, addMessage, MessagesState } from "../features/Conversation/MessagesSlice"
import URL from "../URL"
import { store } from "../app/store"
import socket from "../utils/socket"

export const MessageEndPointApi = createApi({
	reducerPath: "messagesApi",
	baseQuery: fetchBaseQuery({ baseUrl: URL, credentials: "include", }),
	tagTypes: ["Message"],

	endpoints: (builder) => ({
		getMessagesByRoomId: builder.query<MessagesState, { room_id: string, page: number }>({

			query: (args) => ({
				url: `messages/room/${args.room_id}?page=${args.page}`,


			}),
			transformResponse: (rawResult, meta) => {
				console.log(rawResult);
				const result = (rawResult as MessagesState)

				return result

			},

			keepUnusedDataFor: 30,
			onQueryStarted: async (arg, api) => {
				try {

					const { data } = await api.queryFulfilled


				} catch (err) {
					console.log(err)
				}

			},
			onCacheEntryAdded: async (arg, api) => {
				// create a websocket connection when the cache subscription starts
				try {
					socket.connect()
					await api.cacheDataLoaded
					const room = store.getState().MessagesReducer.room
					const listener = (data: { message: Message, room: string }) => {
						console.log("GETMSG", data)

						api.updateCachedData((draft) => {
							console.log(data)
							if (room !== null && room._id !== data.room) return
							draft.messagesResponse.messages.push(data.message)
							store.dispatch(addMessage(data.message))
							return draft
						})
					}
					if (room != null) {
						socket.on(`getmsg:${room._id}`, listener)
					}

				} catch (e) {
					console.log((e as Error).message)
				}
				await api.cacheEntryRemoved
			},

		}),
	})
})
export const { useGetMessagesByRoomIdQuery, useLazyGetMessagesByRoomIdQuery } = MessageEndPointApi