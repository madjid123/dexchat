import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/user/authSlice";
import RoomsReducer from "../features/user/RoomsSlice";
import MessagesReducer from "../features/Conversation/MessagesSlice";
import ProfileReducer from "../features/user/profileSlice";
import { MessageEndPointApi } from "../services/MessageApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { SearchEndPointAPI } from "../services/searchApi";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "auth",
  storage,
};
const AuthReducer = persistReducer(persistConfig, authReducer);
const searchAPIReducerPath = SearchEndPointAPI.reducerPath
export const store = configureStore({
  reducer: {
    // persistedReducer,
    AuthReducer,
    RoomsReducer,
    MessagesReducer,
    ProfileReducer,
    [MessageEndPointApi.reducerPath]: MessageEndPointApi.reducer,
    searchAPIReducerPath: SearchEndPointAPI.reducer,
    [SearchEndPointAPI.reducerPath]: SearchEndPointAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false })
      .concat(MessageEndPointApi.middleware)
      .concat(SearchEndPointAPI.middleware);
  },
  devTools: process.env.NODE_ENV !== "production",
});
setupListeners(store.dispatch);
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
const MessageEndPointAPIPath = MessageEndPointApi.reducerPath
const SearchEndPointAPIPath = SearchEndPointAPI.reducerPath
// export type RootState = ReturnType<typeof store.getState>;
// type RootStateType = {
//   AuthReducer: ReturnType<typeof AuthReducer>;
//   RoomsReducer: ReturnType<typeof RoomsReducer>;
//   MessagesReducer: ReturnType<typeof MessagesReducer>;
//   ProfileReducer: ReturnType<typeof ProfileReducer>;
//   MessageEndPointAPIPath : ReturnType<
//     typeof MessageEndPointApi.reducer
//   >;
//   [(SearchEndPointAPI.reducerPath as string)]: ReturnType<typeof SearchEndPointAPI.reducer>;
// };
// export type RootState = RootStateType;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
