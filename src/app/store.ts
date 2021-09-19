import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthReducer from "../features/user/authSlice"
import RoomsReducer from "../features/user/RoomsSlice"
import MessagesReducer from "../features/Conversation/MessagesSlice"
import { MessageEndPointApi } from "../services/MessageApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    AuthReducer,
    RoomsReducer,
    MessagesReducer,
    [MessageEndPointApi.reducerPath]: MessageEndPointApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(MessageEndPointApi.middleware)
  }


});
setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

