import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { io } from "socket.io-client"
import { Message, MessagesResponse, setMessagesState } from "../features/Conversation/MessagesSlice"
import URL from "../URL"
import { store } from "../app/store"
import { _socket } from "../components/Conversation"
import socket from "../utils/socket"
socket.connect()
export const MessageEndPointApi = createApi({
	reducerPath: "messagesApi",
	baseQuery: fetchBaseQuery({ baseUrl: URL, credentials: "include", }),
	tagTypes: ["Message"],

	endpoints: (builder) => ({
		getMessagesByRoomId: builder.query<MessagesResponse, { room_id: string, page: number }>({

			query: (args) => ({
				url: `messages/room/${args.room_id}?page=${args.page}`,


			}),
			transformResponse: (rawResult, meta) => {
				const result = (rawResult as MessagesResponse)
				//console.log(result)
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
					console.log(_socket, socket)
					// wait for the initial query to resolve before proceeding
					await api.cacheDataLoaded

					// when data is received from the socket connection to the server,
					// if it is a message and for the appropriate channel,
					// update our query result with the received message
					console.log("getMsg")
					const listener = (data: Message) => {
						console.log("GETMSG", data)
						api.updateCachedData((draft) => {

							draft.messages.push(data)
							return draft
						})
					}
					socket.on("getmsg", listener)

				} catch (e) {
					console.log((e as Error).message)
					// no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
					// in which case `cacheDataLoaded` will throw
				}
				// cacheEntryRemoved will resolve when the cache subscription is no longer active
				await api.cacheEntryRemoved
				// perform cleanup steps once the `cacheEntryRemoved` promise resolves
				api.updateCachedData((draft) => {
					console.log("cache", draft)
				})
			},






		}),



	})

})
export const { useGetMessagesByRoomIdQuery, useLazyGetMessagesByRoomIdQuery } = MessageEndPointApi