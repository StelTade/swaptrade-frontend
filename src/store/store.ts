import { configureStore } from "@reduxjs/toolkit";
import referralReducer from "./referralSlice";
import notificationReducer from "./notificationSlice";

export const store = configureStore({
  reducer: {
    referral: referralReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
