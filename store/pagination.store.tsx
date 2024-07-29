import { createSlice } from '@reduxjs/toolkit';
import { IRootState } from '.';
import { PaginationOptions } from '@/types/pagination';

const initialState: PaginationOptions = {
    page: 1,
    limit: 10,
    sortField: 'name',
    sortOrder: 'ASC',
    search: '',
};

const paginationSlice = createSlice({
    name: 'pagination',
    initialState: initialState,
    reducers: {
        setPaginationOptions(state, action) {
            const { page = 1, limit = 10, sortField = 'name', sortOrder = 'ASC', search = '' } = action.payload as PaginationOptions;
            state.page = page;
            state.limit = limit;
            state.sortField = sortField;
            state.sortOrder = sortOrder;
            state.search = search;
        },
        setPage(state, { payload }) {
            state.page = payload;
        },
        setLimit(state, { payload }) {
            state.limit = payload;
        },
        setSortField(state, { payload }) {
            state.sortField = payload;
        },
        setSortOrder(state, { payload }) {
            state.sortOrder = payload;
        },
    },
});

export const { setPaginationOptions, setPage, setLimit, setSortField, setSortOrder } = paginationSlice.actions;

export const paginationOptions = (state: IRootState) => state.pagination;

export default paginationSlice.reducer;
