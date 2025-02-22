import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";
import localForage from "localforage"
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

// Configure localForage to use IndexedDB
localForage.config({
    driver: localForage.INDEXEDDB, // Use IndexedDB
    name: 'taskDB', // Database name
    storeName: 'tasks', // Table/Store name
});

// Redux Persist Config
const persistConfig = {
    key: 'root', 
    storage: localForage, // Use IndexedDB for storage
    whitelist: ['tasks'], // Persist only the 'tasks' slice
};

const persistedReducer = persistReducer(persistConfig, taskReducer);

const store = configureStore({
    reducer: {
        tasks: persistedReducer
    }
});
export default store;
export const persistor = persistStore(store);