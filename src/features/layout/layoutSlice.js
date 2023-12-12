import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  layoutModeType: 'light'
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    changeLayoutMode: (state, action) => {
      state.layoutModeType = action.payload;
    }
  }
});

export const { changeLayoutMode } = layoutSlice.actions;

export default layoutSlice.reducer;
