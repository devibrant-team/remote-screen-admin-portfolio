import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./src/Redux/Slices/authSlice";
import planReducer from "./src/Redux/Slices/addPlanSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    plans: planReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;