import { createSlice, createAsyncThunk, Reducer } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../../app/store";

// API URL of our app usually localhost:5000
import API_URL from "../../URL";
import { useSelector } from "react-redux";

export interface CurrentUser {
  _id: string;
  username: string;
  image?: string;
  email: string;
}
export interface AuthState {
  isLoading: boolean;
  isAuth: boolean;
  error: AuthError;
  currentUser?: CurrentUser;
}
interface AuthError {
  messages: string[];
}

export const initialState = {
  isLoading: false,
  isAuth: false,
  currentUser: undefined,
  error: { messages: [] },
} as AuthState;
// implement the login logic for our chat app using thunks in redux
export const login = createAsyncThunk(
  "users/Login",
  async ({ username, password }: any, thunkAPI) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}/auth/login`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          username: username,
          password: password,
        },
      });
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("isAuth", "true");
        return response.data;
      }
    } catch (e) {
      const err = e as AxiosError;
      if (err.response)
        return thunkAPI.rejectWithValue([...err.response.data] as string[]);
      else return thunkAPI.rejectWithValue([err.message] as string[]);
    }
  }
);
export const logout = createAsyncThunk("users/logout", async (opt, thunk) => {
  try {
    const response = await axios.get(API_URL + "/auth/logout", {
      withCredentials: true,
    });
    if (response.status === 200) {
      localStorage.removeItem("user");
      localStorage.removeItem("isAuth");
      return initialState;
    }
  } catch (err: any) {
    console.error(err);
    thunk.rejectWithValue(err.response.data);
  }
});

export const CheckisAuth = createAsyncThunk(
  "users/isAauth",
  async (opt, thunkAPI) => {
    try {
      const response = await axios.get(API_URL + "/auth/", {
        withCredentials: true,
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(initialState);
      }
    } catch (e) {
      const err = e as AxiosError;
      console.error(err);
      return thunkAPI.rejectWithValue(initialState);
    }
  }
);

const AuthReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state, action) => {
      state.error.messages = [];
    },
    getAuth: (state, action) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, { payload }) => {
        const ErrorMessages: any[] = [];
        ErrorMessages.push(payload as any[]);
        state.error.messages = [...ErrorMessages];
      })
      .addCase(login.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        return initialState;
      })
      .addCase(logout.rejected, (state, { payload }) => { })
      .addCase(CheckisAuth.fulfilled, (state, { payload }) => {
        if (!payload.username) return initialState;
        state.isAuth = true;
        state.currentUser = payload as CurrentUser;
      })
      .addCase(CheckisAuth.rejected, (state, { payload }) => {
        return initialState;
      });
  },
});
const { actions } = AuthReducer;
export const { clearErrors, getAuth } = actions;
export const AuthSelector = (state: RootState) => state.AuthReducer;
export const useAuthSelector = () => useSelector(AuthSelector);
export default AuthReducer.reducer as Reducer<typeof initialState>;
