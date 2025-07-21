import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Plan, PlanFormData } from "../../Interface/Interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EditMainPlanApi } from "../../API/API";

interface PlanModalState {
  open: boolean;
  selectedPlan: Plan | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  isEdit: boolean;
}

const initialState: PlanModalState = {
  open: false,
  selectedPlan: null,
  loading: false,
  error: null,
  success: false,
  isEdit: false,
};

// ✅ Thunk for updating the plan
export const updatePlan = createAsyncThunk(
  "planModal/updatePlan",
  async (data: PlanFormData & { id: number }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${EditMainPlanApi}${data.id}`, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to update plan");
    }
  }
);
export const planModalSlice = createSlice({
  name: "planModal",
  initialState,
  reducers: {
    openPlanModal: (
      state,
      action: PayloadAction<{ plan: Plan | null; isEdit: boolean }>
    ) => {
      state.open = true;
      state.selectedPlan = action.payload.plan;
      state.isEdit = action.payload.isEdit;
    },
    closePlanModal: (state) => {
      state.open = false;
      state.selectedPlan = null;
      state.success = false;
      state.isEdit = false;
      state.error = null;
    },
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.selectedPlan = action.payload; // update with new plan data
      })
      .addCase(updatePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { openPlanModal, closePlanModal, resetStatus } = planModalSlice.actions;
export default planModalSlice.reducer;
