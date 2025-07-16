import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PlanFormData } from "../../Interface/Interfaces";

export const insertPlan = createAsyncThunk(
  "plans/insertPlan",
  async (formData: PlanFormData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      const response = await axios.post(
        "http://192.168.10.107:8000/api/insertplan",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const planSlice = createSlice({
  name: "plans",
  initialState: {
    loading: false,
    error: null as string | null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(insertPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(insertPlan.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(insertPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default planSlice.reducer;