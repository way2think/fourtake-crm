import { createSlice } from '@reduxjs/toolkit';
import { IRootState } from '.';
import { User } from '@/entities/user.entity';
import { Role } from '@/entities/role.entity';

const initialState: {
    user: User;
    accessToken: string;
    isAuthenticated: boolean;
} = {
    user: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        created_at: '',
        is_active: false,
        is_logged_in: false,
        phone: '',
        role: Role.GUEST,
        username: '',
        center: {
            id: 0,
            name: '',
            phone: '',
            email: '',
            address: '',
            is_active: false,
        },
    },
    accessToken: '',
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setCurrentUser(state, { payload }) {
            state.user = payload;
        },
    },
});

export const { setCurrentUser } = userSlice.actions;

export const selectAccessToken = (state: IRootState) => state.user.accessToken;
export const selectIsAuthenticated = (state: IRootState) => state.user.isAuthenticated;
export const selectUser = (state: IRootState) => state.user.user;

export default userSlice.reducer;
