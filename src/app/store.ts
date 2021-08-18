import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthReducer from "../features/user/authSlice";
import RoomsReducer from "../features/user/RoomsSlice"
export const store = configureStore({
  reducer: {
    AuthReducer,
    RoomsReducer
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
function add(a: number, b: number): number {
  return a + b;
}
