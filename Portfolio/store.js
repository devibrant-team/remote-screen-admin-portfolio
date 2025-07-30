import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./src/Redux/authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
