import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import basketSlice from './basketSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        basket: basketSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});