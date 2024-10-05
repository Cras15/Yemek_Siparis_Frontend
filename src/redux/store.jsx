import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import basketSlice from './basketSlice';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import persistStore from 'redux-persist/es/persistStore';
import { persistReducer } from 'redux-persist';
import shopSlice from './shopSlice';

const userPersistConfig = {
    key: "user",
    storage,
};

const userReducer = persistReducer(userPersistConfig, userSlice);

const shopPersistConfig = {
    key: "shop",
    storage: sessionStorage,
    whitelist: ['selectedShop', 'status'],
};

const shopReducer = persistReducer(shopPersistConfig, shopSlice);

const store = configureStore({
    reducer: {
        user: userReducer,
        basket: basketSlice,
        shop: shopReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const Persistor = persistStore(store);

export { Persistor };
export default store;