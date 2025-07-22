import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateCustomPlan = createAsyncThunk(
  "customPlan/update",
  async (payload: { id: number; price: number  }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://192.168.10.138:8000/api/updatecustom/${payload.id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Failed to update plan");
      }

      return await res.json();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const customPlanSlice = createSlice({
  name: "customPlan",
  initialState: {
    isUpdating: false,
    updateError: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCustomPlan.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(updateCustomPlan.fulfilled, (state) => {
        state.isUpdating = false;
      })
      .addCase(updateCustomPlan.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.payload as string;
      });
  },
});

export default customPlanSlice.reducer;
