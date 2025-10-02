
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import roomSlice from "./slices/rooms";
import userDetails from "./slices/userDetails";

export const rootReducer = combineReducers({
  rooms: roomSlice,
  userDetails: userDetails
});

// minimal store export
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
