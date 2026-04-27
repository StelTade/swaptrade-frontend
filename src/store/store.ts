import { configureStore } from "@reduxjs/toolkit";
import referralReducer from "./referralSlice";
import notificationReducer from "./notificationSlice";
import bonusReducer from "./bonusSlice";

export const store = configureStore({
  reducer: {
    referral: referralReducer,
    notifications: notificationReducer,
    bonus: bonusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
