import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@/services/api/apiSlice';
import themeConfigSlice from '@/store/theme.store';
import userSlice from '@/store/user.store';

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    themeConfig: themeConfigSlice,
    user: userSlice,
});

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export type IRootState = ReturnType<typeof rootReducer>;
