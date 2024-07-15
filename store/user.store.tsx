import { createSlice } from '@reduxjs/toolkit';
import { IRootState } from '.';

const initialState = {
    user: {},
    accessToken: '',
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
});

export const {} = userSlice.actions;

export const selectAccessToken = (state: IRootState) => state.user.accessToken;
export const selectIsAuthenticated = (state: IRootState) => state.user.isAuthenticated;
export const selectUser = (state: IRootState) => state.user.user;

export default userSlice.reducer;
