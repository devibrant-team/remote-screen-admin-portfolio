// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./src/Redux/Slices/authSlice";
import planReducer from "./src/Redux/Slices/addPlanSlice";
import planModalReducer from "./src/Redux/Slices/EditMainPlanPost";
import { userApi } from "./src/Redux/Slices/userSearchSlice";
import { getuserApi } from "./src/Redux/Slices/getuserSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    plans: planReducer,
    planModal: planModalReducer,
    [userApi.reducerPath]: userApi.reducer,
    [getuserApi.reducerPath]: getuserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, getuserApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
