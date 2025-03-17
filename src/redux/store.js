import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";
import apptodoReducer from "./slices/appSlice";
import localForage from "localforage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage"; // Optionally use default localStorage

// Configure localForage to use IndexedDB
localForage.config({
    driver: localForage.INDEXEDDB,
    name: "taskDB",
    storeName: "tasks",
});

// Redux Persist Configs for each slice
const taskPersistConfig = {
    key: "tasks",
    storage: localForage, // Use IndexedDB
};

const apptodoPersistConfig = {
    key: "apptodo",
    storage: localForage, // Use IndexedDB
};

// Apply persistReducer separately to each slice
const persistedTaskReducer = persistReducer(taskPersistConfig, taskReducer);
const persistedApptodoReducer = persistReducer(apptodoPersistConfig, apptodoReducer);

const store = configureStore({
    reducer: {
        tasks: persistedTaskReducer,
        apptodo: persistedApptodoReducer,
    },
});

export default store;
export const persistor = persistStore(store);
