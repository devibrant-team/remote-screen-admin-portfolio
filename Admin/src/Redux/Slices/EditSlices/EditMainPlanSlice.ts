// src/Redux/Slices/editPlanSlice.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Plan } from "../../../Interface/Interfaces";
import { EditMainPlanApi } from "../../../API/API";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const updatePlan = createAsyncThunk(
  "plans/updatePlan",
  async (updatedPlan: Plan, { rejectWithValue }) => {
    try {
      const response = await axios.put(EditMainPlanApi, updatedPlan);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

//Slice
interface EditPlanState {
  currentPlan: Plan | null;
}

const initialState: EditPlanState = {
  currentPlan: null,
};

const editingPlanSlice = createSlice({
  name: "editingPlan",
  initialState,
  reducers: {
    setEditingPlan: (state, action: PayloadAction<Plan | null>) => {
      state.currentPlan = action.payload;
    },
  },
});

export const { setEditingPlan } = editingPlanSlice.actions;
export default editingPlanSlice.reducer;