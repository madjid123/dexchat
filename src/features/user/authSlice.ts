import {
  createSlice,
  createAsyncThunk,
  Reducer,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { response } from "express";
import { RootState } from "../../app/store";
// API URL of our app usually localhost:5000
import API_URL from "../../URL";

interface CurrentUser {
  id: string;
  username: string;
}
export interface AuthState {
  isLoading: boolean;
  isAuth: boolean;
  error: AuthError;
  currentUser?: CurrentUser;
}
interface AuthError {
  message: string;
}
export const login = createAsyncThunk(
  "users/Login",
  async ({ email, password }: any, thunkAPI) => {
    const response = await axios.post(`${API_URL}/login`, {
      email: email,
      password: password,
    });

    if (response.status === 200) {
      const user: CurrentUser = {
        username: response.data.name,
        id: response.data.id,
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuth", "true");
      return user;
    } else {
      console.log("lkdsjfklj");
      console.log(response.status);
      return thunkAPI.rejectWithValue(response);
    }
  }
);

const initialState = {
  isLoading: false,
  isAuth: false,
  currentUser: undefined,
  error: { message: "somthing goes wrong!..." },
} as AuthState;

const AuthReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        console.log("fulfilled");
        state.currentUser = payload;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action);
        console.log("rejected Login");
      });
  },
});

export const AuthSelector = (state: RootState) => state.AuthReducer;
export default AuthReducer.reducer as Reducer<typeof initialState>;
