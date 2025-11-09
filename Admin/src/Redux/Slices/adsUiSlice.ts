// src/Redux/Slices/adsUiSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SelectedAd } from "../../Interface/Interfaces";

type AdsUiState = {
  isOpen: boolean;
  mode: "create" | "edit";
  selectedAd: SelectedAd | null;
};

const initialState: AdsUiState = {
  isOpen: false,
  mode: "create",
  selectedAd: null,
};

const adsUiSlice = createSlice({
  name: "adsUi",
  initialState,
  reducers: {
    openCreateAdsModal(state) {
      state.isOpen = true;
      state.mode = "create";
      state.selectedAd = null;
    },
    openEditAdsModal(state, action: PayloadAction<SelectedAd>) {
      state.isOpen = true;
      state.mode = "edit";
      state.selectedAd = action.payload;
    },
    closeAdsModal(state) {
      state.isOpen = false;
    },
    clearSelectedAd(state) {
      state.selectedAd = null;
      state.mode = "create";
    },
  },
});

export const {
  openCreateAdsModal,
  openEditAdsModal,
  closeAdsModal,
  clearSelectedAd,
} = adsUiSlice.actions;

export default adsUiSlice.reducer;
