import {
  createSlice,
  createAsyncThunk,
  Reducer,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
// API URL of our app usually localhost:5000
import API_URL from "../../URL";

interface CurrentUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;

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


// implement the login logic for our chat app using thunks in redux 
export const login = createAsyncThunk(
  "users/Login",
  async ({ email, password }: any, thunkAPI) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${API_URL}/login`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email: email,
          password: password,
        },
        withCredentials: true
      })
      console.log(response)
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("isAuth", "true");
        return response.data;
      }

    }
    catch (err: any) {
      console.log(err.response.data);
      return thunkAPI.rejectWithValue(err.response.data as any);
    }
  }
);
export const logout = createAsyncThunk("users/logout", async (opt, thunk) => {
  try {
    const response = await axios.get(API_URL + "/logout", { withCredentials: true });
    if (response.status === 200) {

      localStorage.removeItem("user");
      localStorage.removeItem("isAuth");
      return initialState;
    }
  } catch (err: any) {
    console.log(err);
    thunk.rejectWithValue(err.response.data)

  }
});

export const CheckisAuth = createAsyncThunk("users/isAauth", async (opt, thunkAPI) => {
  try {
    const response = await axios.get(API_URL + "/login", { withCredentials: true })
    if (response.status === 200) {
      console.log(response)
      return response.data
    }
    else {
      return thunkAPI.rejectWithValue(initialState)
    }
  } catch (err: any) {
    console.log(err)
    return thunkAPI.rejectWithValue(initialState)

  }
})
const initialState = {
  isLoading: false,
  isAuth: false,
  currentUser: undefined,
  error: { messages: [] },
} as AuthState;

const AuthReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state, action) => {
      state.error.messages = []
    },
    getAuth: (state, action) => {
      return state
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        console.log("fulfilled");
        state.currentUser = payload;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action) => {
        const messages = action.payload as string[]
        state.error.messages = [...action.payload as any[]]
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        return initialState;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        console.log("falied to logout");
      }).addCase(CheckisAuth.fulfilled, (state, { payload }) => {
        if (!payload.name) return initialState;
        state.isAuth = true;
        state.currentUser = payload as CurrentUser
      }).addCase(CheckisAuth.rejected, (state, { payload }) => {
        state.isAuth = false
        return initialState
      })

  },
});
const { actions, reducer } = AuthReducer
export const { clearErrors, getAuth } = actions
export const AuthSelector = (state: RootState) => state.AuthReducer;
export default AuthReducer.reducer as Reducer<typeof initialState>;
