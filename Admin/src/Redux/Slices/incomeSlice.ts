import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define parameters structure
interface IncomeOverviewParams {
  year?: number | null;
  month?: number | null;
  day?: number | null;
}
const token = localStorage.getItem("token");
// Define the response structure (customize based on your actual API response)
type IncomeOverviewResponse = any;

// Async thunk to fetch income overview
export const fetchIncomeOverview = createAsyncThunk<
  IncomeOverviewResponse, // Return type
  IncomeOverviewParams | void, // Args type
  { rejectValue: string } // Rejection type
>("incomeOverview/fetch", async (args, thunkAPI) => {
  try {
    const { year = null, month = null, day = null } = args ?? {};

    // Build flat request payload
    const payload: Record<string, number> = {};
    if (year !== null) payload.year = year;
    if (month !== null) payload.month = month;
    if (day !== null) payload.day = day;

    // ✅ Send flat object — NOT { params: { ... } }
    const response = await axios.post(
      "http://192.168.10.138:8000/api/incomeoverview",
     payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Params", payload);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch income overview"
    );
  }
});

// Define the Redux state shape
interface IncomeOverviewState {
  loading: boolean;
  data: IncomeOverviewResponse | null;
  error: string | null;
}

// Initial state
const initialState: IncomeOverviewState = {
  loading: false,
  data: null,
  error: null,
};

// Create slice
const incomeOverviewSlice = createSlice({
  name: "incomeOverview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomeOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIncomeOverview.fulfilled,
        (state, action: PayloadAction<IncomeOverviewResponse>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchIncomeOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default incomeOverviewSlice.reducer;
