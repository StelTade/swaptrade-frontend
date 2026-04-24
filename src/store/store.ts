import { configureStore } from "@reduxjs/toolkit";
import referralReducer from "./referralSlice";

export const store = configureStore({
  reducer: {
    referral: referralReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
