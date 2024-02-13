import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "./libs/loginSlice";
import userReducer from "./libs/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const mergeReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
});

const rootReducer = persistReducer(persistConfig, mergeReducer);

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
