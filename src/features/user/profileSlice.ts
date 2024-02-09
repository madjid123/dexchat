import { createSlice, createAsyncThunk, current, Reducer } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ProfileInfo, UserInfo } from './profileSlice.types';
import API_URL from '~/URL';
import { RootState } from '~/app/store';
import { useSelector } from 'react-redux';
// Async thunk for updating user info
export const updateUserInfo = createAsyncThunk(
    'profile/updateUserInfo',
    async (userInfo: UserInfo, thunkAPI) => {
        try {
            // Your update logic here
            // For example, make an API call to update user info
            const cleanUserInfo : Omit<UserInfo,"_id"> = userInfo ;
            const response = await axios({
                method: 'post',
                url: `${API_URL}/user/${userInfo._id}/modify/profile`,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: cleanUserInfo
            });
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

// Async thunk for updating profile avatar
export const updateProfileAvatar = createAsyncThunk(
    'profile/updateProfileAvatar',
    async ({ avatarFormData, userId }: { avatarFormData: FormData, userId: string }, thunkAPI) => {
        try {
            // Your update logic here
            // For example, make an API call to upload and update profile avatar
            const response = await axios({
                method: 'post',
                url: `${API_URL}/user/${userId}/modify/avatar`,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: avatarFormData
            });
            console.log(response.data);
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

// Profile slice
const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        userInfo: null,
        avatarFormData: null,
        loading: false,
        error: null,
    } as ProfileInfo,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setAvatarFormData: (state, action) => {
            state.avatarFormData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(updateUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateProfileAvatar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfileAvatar.fulfilled, (state, action) => {
                state.loading = false;
                state.avatarFormData = action.payload;
            })
            .addCase(updateProfileAvatar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});
const { actions } = profileSlice;
export const { setUserInfo, setAvatarFormData } = actions;
export const ProfileSelector = (state: RootState) => state.ProfileReducer;
export const useProfileSelector = () => useSelector(ProfileSelector);
export default profileSlice.reducer as Reducer<ProfileInfo>;