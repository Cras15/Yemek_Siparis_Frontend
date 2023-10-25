import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import basketSlice from './basketSlice';
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore';
import { persistReducer } from 'redux-persist';

const persistConfig  = {
    key: "user",
    storage,
}

const userReducer = persistReducer(persistConfig, userSlice);
const basketReducer = persistReducer({key: "basket", storage}, basketSlice);

const store = configureStore({
    reducer: {
        user: userReducer,
        basket: basketReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const Persistor = persistStore(store);

export { Persistor };
export default store;