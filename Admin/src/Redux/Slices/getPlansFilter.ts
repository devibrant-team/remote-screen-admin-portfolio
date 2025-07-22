// src/Redux/Slices/plansSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PlanFilter } from "../../Interface/Interfaces";
import { GetPlansFilter } from "../../API/API";

export const fetchFilteredPlans = createAsyncThunk<PlanFilter[]>(
  "plans/fetchPlans",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<{ plans: PlanFilter[] }>(GetPlansFilter, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.plans;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch plans");
    }
  }
);

interface PlansState {
  data: PlanFilter[];
  loading: boolean;
  error: string | null;
}

const initialState: PlansState = {
  data: [],
  loading: false,
  error: null,
};

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredPlans.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchFilteredPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default plansSlice.reducer;
