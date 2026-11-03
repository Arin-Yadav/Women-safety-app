import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import roomReducer from "./slices/roomSlice";
import storageSession from "redux-persist/lib/storage/session";
import { persistStore, persistReducer } from "redux-persist";

const sessionStorage = storageSession.default ?? storageSession;

// console.log("sessionStorage =", sessionStorage);
// console.log("typeof getItem =", typeof sessionStorage?.getItem);

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
