import { createSlice } from '@reduxjs/toolkit';
import { IRootState } from '.';

const initialState: { isLoading: boolean } = {
    isLoading: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
});

export const { setIsLoading } = appSlice.actions;

export const selectIsLoading = (state: IRootState) => state.app.isLoading;

export default appSlice.reducer;
