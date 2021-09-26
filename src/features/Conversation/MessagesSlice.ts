import {
	createSlice,
	createAsyncThunk,
	Reducer,
} from "@reduxjs/toolkit"
import { MessageEndPointApi, useGetMessagesByRoomIdQuery } from "../../services/MessageApi"
import { RootState } from "../../app/store"
import axios, { AxiosError } from "axios"
import URL from "../../URL"
import { type } from "os"
import { buildHooks } from "@reduxjs/toolkit/dist/query/react/buildHooks"
// axios({
// 	headers: {
// 		'Content-Type': 'application/json',
// 	},
// 	withCredentials: true
// })
export interface Message {
	Sender: {
		id: string,
		username: string
	}
	Receiver: {
		id: string,
		username: string
	}
	Room: {
		id: string,
		username?: string
	}
	content: {
		text: string
	}
	SentAt: Date

}
export interface MessagesResponse {

	messages: Message[],
	page: number,
	pages: number,
}
interface MessagesState {
	messagesResponse: MessagesResponse
	errors: string[]
}
const initialState: MessagesState = {
	messagesResponse: {
		messages: [],
		page: 1,
		pages: 1
	},
	errors: []
}

export const SendMessageToApi = createAsyncThunk<void, { message: Message, room_id: string }, {}>("message/send", async ({
	message,
	room_id
},
	thunkAPI) => {
	try {
		const response = await axios.post(URL + "/room/" + room_id + "/send/message", message, { withCredentials: true })
		console.log(response.data)
	} catch (err) {
		const error = err as Error
		console.error(error)

	}

}
)
export const LoadMessages = createAsyncThunk("messages/loadmessages", async (room_id: string, thunkAPI) => {
	try {
		const response = await axios.get(`${URL}/messages/room/${room_id}`, { withCredentials: true })
		return response.data.messages as Message[]
	} catch (err) {
		const error = err as AxiosError || err as Error
		console.error(error)
		if (error.response) {
			thunkAPI.rejectWithValue(error.response.data as string)
			console.log(error.response.data as string)
		}
	}

})
const MessagesReducer = createSlice({
	name: "messages",
	initialState,
	reducers: {
		addMessage: (state, { payload }) => {
			console.log(payload)
			state.messagesResponse.messages = [...state.messagesResponse.messages, payload]


		},
		clearAllMessages: (state, { payload }) => {
			state.messagesResponse = {
				messages: [],
				page: 1,
				pages: 1
			}
		},
		setMessagesState: (state, { payload }: { payload: Message[] }) => {
			state.messagesResponse.messages = payload
		}




	},
	extraReducers: (bulider) => {

		// bulider.addCase(LoadMessages.fulfilled, (state, { payload }: { payload: Message[] | undefined }) => {
		// 	if (payload !== undefined)
		// 		state.messages = payload
		// })
		bulider.addMatcher(MessageEndPointApi.endpoints.getMessagesByRoomId.matchFulfilled,
			(state, action) => {
				if (state.messagesResponse.messages.length === 0)
					state.messagesResponse = action.payload;
				else {
					console.log(action.payload)
					state.messagesResponse = {
						messages: [...action.payload.messages, ...state.messagesResponse.messages,],
						page: action.payload.page,
						pages: action.payload.pages
					}
				}

			})
		bulider.addMatcher(MessageEndPointApi.endpoints.getMessagesByRoomId.matchRejected, (state, action) => {
			console.log(action)
			if (action.error.message !== undefined)
				state.errors.push(action.error.message)


		})
	}


})

const { actions, reducer } = MessagesReducer
export const { addMessage, clearAllMessages, setMessagesState
} = actions
export const MessagesSelector = (state: RootState) => state.MessagesReducer
export default MessagesReducer.reducer as Reducer<typeof initialState>
