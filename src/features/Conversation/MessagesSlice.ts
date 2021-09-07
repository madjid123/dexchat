import {
	createSlice,

	Reducer
} from "@reduxjs/toolkit"

import { RootState } from "../../app/store"
export interface Message {
	to: {
		name: string,
		id: string,
	},
	from: {
		name: string,
		id: string
	},

	content: string,
}
interface MessagesState {
	messages: Message[]
}
const initialState: MessagesState = {
	messages: []
}
const MessagesReducer = createSlice({
	name: "messages",
	initialState,
	reducers: {
		addMessage: (state, { payload }) => {
			console.log(payload)
			state.messages = [...state.messages, payload as Message]

		},
		clearAllMessages: (state, { payload }) => {
			state.messages = []
		}

	}


})
const { actions, reducer } = MessagesReducer
export const { addMessage, clearAllMessages } = actions
export const MessagesSelector = (state: RootState) => state.MessagesReducer
export default MessagesReducer.reducer as Reducer<typeof initialState>
