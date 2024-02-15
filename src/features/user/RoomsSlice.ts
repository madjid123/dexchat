import {
  createSlice,
  createAsyncThunk,
  Reducer,
  createEntityAdapter,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from "~/config/axios"
import { RootState } from '../../app/store';
// API URL of our app usually localhost:5000
const API_URL = import.meta.env.VITE_API_URL;

export interface Member {
  username: string;
  _id: string;
  image?: string;
  email: string;
}
export interface Room {
  members: Member[];
  _id: string;
  newMessage: false;
  // messages: MessagesResponse
}
interface RoomError {
  exist: boolean;
  message: string;
}
type RoomsState = EntityState<Room> & { error: RoomError };

const RoomsAdapter = createEntityAdapter<Room>({
  selectId: (roomState) => roomState._id,
});
export const getRooms = createAsyncThunk(
  'users/getRooms',
  async ({ id }: any, thunkAPI) => {
    try {
      const _id = id;
      const response = await axios.get(API_URL+ `/user/${_id}/rooms`, {
        withCredentials: true,
        headers: {
          Authorization:
            'Bearer ' + (thunkAPI.getState() as RootState).AuthReducer.token,
        },
      });
      if (response.status === 200) {
        thunkAPI.dispatch(setAllRooms(response.data.Rooms));
        // return response.data.Rooms
      }
    } catch (err: any) {
      console.error(err);
      thunkAPI.rejectWithValue(`Failed to get Rooms : ${err.message} `);
    }
  },
);
// const initialState: RoomsState = {
// 	ids: [],
// 	entities: {},
// 	error: {
// 		exist: false,
// 		message: ""
// 	}
// }
const RoomsReducer = createSlice({
  name: 'rooms',
  initialState: RoomsAdapter.getInitialState({
    error: {
      exist: false,
      message: '',
    } as RoomError,
  }),
  reducers: {
    RoomUpdate: RoomsAdapter.updateOne,
    setAllRooms(state, action: PayloadAction<Room[]>) {
      let rooms = action.payload;
      rooms = rooms.map((room) => {
        return {
          ...room,
          messages: {
            messages: [],
            page: 1,
            pages: 1,
          },
        };
      });
      RoomsAdapter.setAll(state, rooms);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRooms.fulfilled, (state, payload) => {
        state.error = { exist: false, message: '' };
        // RoomsAdapter.setAll(state,payload)
      })
      .addCase(getRooms.rejected, (state, { payload }) => {
        state.error.exist = true;
        state.error.message = payload as string;
      });
  },
});
export const { setAllRooms, RoomUpdate } = RoomsReducer.actions;
export const RoomsSelectors = RoomsAdapter.getSelectors<RootState>(
  (state) => state.RoomsReducer,
);
export const RoomErrorSelector = (state: RootState) => state.RoomsReducer.error;
export const RoomSelector = (state: RootState) => state.RoomsReducer;

export default RoomsReducer.reducer as Reducer<RoomsState>;
