import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { addAd } from "../../API/API";
export const insertAds = createAsyncThunk(
  "ads/insertAds",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      const response = await axios.post(
        addAd,
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

const adsSlice = createSlice({
  name: "ads",
  initialState: {
    loading: false,
    error: null as string | null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(insertAds.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(insertAds.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(insertAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adsSlice.reducer;