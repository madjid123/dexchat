import { createSlice, createAsyncThunk, Reducer } from '@reduxjs/toolkit';
import axios from "~/config/axios"
import { RootState, store } from '../../app/store';
import { AxiosError } from 'axios';
// API URL of our app usually localhost:5000
const API_URL = import.meta.env.VITE_API_URL;
import { useSelector } from 'react-redux';
import socket from '~/utils/socket';

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
  token: string;
}
interface AuthError {
  messages: string[];
}
const token = localStorage.getItem('token') || '';
export const initialState = {
  isLoading: false,
  isAuth: false,
  currentUser: undefined,
  token: token,
  error: { messages: [] },
} as AuthState;
// implement the login logic for our chat app using thunks in redux
export const login = createAsyncThunk(
  'users/Login',
  async ({ username, password }: any, thunkAPI) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${API_URL}/auth/login`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true,

        data: {
          username: username,
          password: password,
        },
      });
      if (response.status === 200) {
        // localStorage.setItem('user', JSON.stringify(response.data));
        // localStorage.setItem('isAuth', 'true');
        const data = await thunkAPI.dispatch(CheckisAuth());
        localStorage.setItem('token', response.data.token);
      
        return response.data;
      }
    } catch (e) {
      const err = e as AxiosError;
      if (err.response)
        return thunkAPI.rejectWithValue([...err.response.data] as string[]);
      else return thunkAPI.rejectWithValue([err.message] as string[]);
    }
  },
);
export const logout = createAsyncThunk('users/logout', async (opt, thunkAPI) => {
  try {
    console.log("logout")
    const response = await axios.get(API_URL + '/auth/logout', {
      withCredentials: true,
headers: {
          Authorization:
            'Bearer ' + (thunkAPI.getState() as RootState).AuthReducer.token,
        },
    });
    if (response.status === 200) {
      localStorage.removeItem('user');
      localStorage.removeItem('isAuth');
      localStorage.removeItem('token');
      const initState = {...initialState, token :""} 
      return initState;
    }
  } catch (err: any) {
    console.error(err);
    thunkAPI.rejectWithValue(err.response.data);
  }
});

export const CheckisAuth = createAsyncThunk(
  'users/isAauth',
  async (opt, thunkAPI) => {
    try {
      const response = await axios.get(API_URL + '/auth/', {
        withCredentials: true,
        headers: {
          Authorization:
            'Bearer ' + (thunkAPI.getState() as RootState).AuthReducer.token,
        },
      });
      if (response.status === 200) {
          socket.io.opts.query = {
          token: (thunkAPI.getState() as RootState).AuthReducer.token,
        };
        socket.connect()
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(initialState);
      }
    } catch (e) {
      const err = e as AxiosError;
      console.error(err);
      const res = await thunkAPI.dispatch(logout())
      console.log(res)
      return thunkAPI.rejectWithValue(initialState);
    }
  },
);

const AuthReducer = createSlice({
  name: 'auth',
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
        state.token = localStorage.getItem("token")!
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
        return payload;
      })
      .addCase(logout.rejected, (state, { payload }) => {})
      .addCase(CheckisAuth.fulfilled, (state, { payload }) => {
        if (!payload.username) return initialState;
        state.isAuth = true;
        state.currentUser = payload as CurrentUser;

        localStorage.setItem('user', JSON.stringify(payload));
        localStorage.setItem('isAuth', 'true');
      })
      .addCase(CheckisAuth.rejected, (state, { payload}) => {
        // console.log("rejected")
        return initialState;
      });
  },
});
const { actions } = AuthReducer;
export const { clearErrors, getAuth } = actions;
export const AuthSelector = (state: RootState) => state.AuthReducer;
export const useAuthSelector = () => useSelector(AuthSelector);
export default AuthReducer.reducer as Reducer<typeof initialState>;
