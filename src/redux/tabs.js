import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name: "tab",

  initialState: {
    activetab: {}
  },

  reducers: {
    searchactivetab: (state, action) => {
      state.activetab = action.payload;
    }
  }
});

export const { searchactivetab } = tabSlice.actions;

export default tabSlice.reducer;