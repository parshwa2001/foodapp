import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slice/cartSlice.js";
// import { orderReducer } from "./slice/orderSlice.js";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
  cart: cartReducer,
  // order: orderReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: true,
});
