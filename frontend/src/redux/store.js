import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import roomReducer from './slices/roomSlice'
import sessionStorage from "redux-persist/lib/storage/session";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  user: userReducer,
  room: roomReducer,
});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
