import {
	createSlice,
	createAsyncThunk,
	Reducer,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
// API URL of our app usually localhost:5000
import URL from "../../URL";


interface Member {
	name: string,
	_id: string,


}
interface Room {
	members: Member[];
	_id: string
}
interface RoomError {
	exist: boolean;
	message: string
}
interface RoomsState {
	rooms: Room[];
	error: RoomError;
}
export const getRooms = createAsyncThunk("users/getRooms", async ({ id }: any, thunkAPI) => {
	try {
		const _id = id
		const response = await axios.get(URL + `/user/contacts/${_id}`, { withCredentials: true })
		if (response.status === 200) {
			return response.data.Rooms
		}

	} catch (err: any) {
		console.log(err)
		thunkAPI.rejectWithValue(`Failed to get Rooms : ${err.message} `);
	}
})
const initialState: RoomsState = {
	rooms: [],
	error: {
		exist: false,
		message: ""
	}
}
const RoomsReducer = createSlice({
	name: "contacts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getRooms.fulfilled, (state, { payload }) => {
			state.rooms = payload as Room[]
		}).addCase(getRooms.rejected, (state, { payload }) => {
			state.error.exist = true;
			state.error.message = payload as string

		});
	}
})

export const RoomsSelector = (state: RootState) => state.RoomsReducer;
export default RoomsReducer.reducer as Reducer<typeof initialState>