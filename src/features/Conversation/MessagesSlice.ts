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
	errors: string[],
	roomId : string
}
const initialState: MessagesState = {
	messagesResponse: {
		messages: [],
		page: 1,
		pages: 1
	},
	errors: [],
	roomId :""
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

const MessagesReducer = createSlice({
	name: "messages",
	initialState,
	reducers: {
		addMessage: (state, { payload }: { payload: Message }) => {
			console.log(typeof payload)
			state.messagesResponse.messages = [...state.messagesResponse.messages, payload]
			console.log(state.messagesResponse.messages)

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
		},
		setRoomId(state,{payload}:{payload : string}){
			state.roomId = payload
		}

	},
	extraReducers: (bulider) => {


		bulider.addMatcher(MessageEndPointApi.endpoints.getMessagesByRoomId.matchFulfilled,
			(state, action) => {
				if (state.messagesResponse.messages.length === 0)
					state.messagesResponse = action.payload;
				else {
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
,setRoomId} = actions
export const MessagesSelector = (state: RootState) => state.MessagesReducer
export default MessagesReducer.reducer as Reducer<typeof initialState>
