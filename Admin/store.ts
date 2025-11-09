// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./src/Redux/Slices/authSlice";
import planReducer from "./src/Redux/Slices/addPlanSlice";
import adsReducer from "./src/Redux/Slices/addAdsSlice";
import statTypeReducer from './src/Redux/Slices/statTypeSlice';
import { userApi } from "./src/Redux/Slices/userSearchSlice";
import { getuserApi } from "./src/Redux/Slices/getuserSlice";
import incomeOverviewReducer from "./src/Redux/Slices/incomeSlice";
import customPlanReducer from"./src/Redux/Slices/EditSlices/EditCustomPlanSlice";
import plansFilterReducer from "./src/Redux/Slices/getPlansFilter";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    plans: planReducer,
    ads: adsReducer,
    filteredplans:plansFilterReducer,
    statType: statTypeReducer,
    incomeOverview:incomeOverviewReducer,
    customPlan: customPlanReducer,
    [userApi.reducerPath]: userApi.reducer,
    [getuserApi.reducerPath]: getuserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, getuserApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
