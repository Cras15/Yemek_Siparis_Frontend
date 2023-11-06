import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import basketSlice from './basketSlice';
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore';
import { persistReducer } from 'redux-persist';
import snackbarSlice from './snackbarSlice';

const persistConfig  = {
    key: "user",
    storage,
}

const userReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
    reducer: {
        user: userReducer,
        basket: basketSlice,
        snackbar: snackbarSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const Persistor = persistStore(store);

export { Persistor };
export default store;