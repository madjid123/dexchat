import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthReducer from "../features/user/authSlice"
import RoomsReducer from "../features/user/RoomsSlice"
import MessagesReducer from "../features/Conversation/MessagesSlice"
import { MessageEndPointApi } from "../services/MessageApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { SearchEndPointAPI } from "../services/searchApi";

export const store = configureStore({
  reducer: {
    AuthReducer,
    RoomsReducer,
    MessagesReducer,
    [MessageEndPointApi.reducerPath]: MessageEndPointApi.reducer,
    [SearchEndPointAPI.reducerPath]: SearchEndPointAPI.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false })
      .concat(MessageEndPointApi.middleware)
      .concat(SearchEndPointAPI.middleware)
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

