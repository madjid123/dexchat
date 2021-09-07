import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthReducer from "../features/user/authSlice"
import RoomsReducer from "../features/user/RoomsSlice"
import MessagesReducer from "../features/Conversation/MessagesSlice"
export const store = configureStore({
  reducer: {
    AuthReducer,
    RoomsReducer,
    MessagesReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

