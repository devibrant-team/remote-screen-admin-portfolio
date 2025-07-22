// Redux/Slices/statTypeSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
interface StatTypeState {
  selected: 'day' | 'month' | 'year';
}

const initialState: StatTypeState = {
  selected: 'day',
};

const statTypeSlice = createSlice({
  name: 'statType',
  initialState,
  reducers: {
    setStatType(state, action: PayloadAction<StatTypeState['selected']>) {
      state.selected = action.payload;
    },
  },
});

export const { setStatType } = statTypeSlice.actions;
export default statTypeSlice.reducer;
