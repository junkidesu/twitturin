import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: false,
  reducers: {
    show: () => {
      return true;
    },
    hide: () => {
      return false;
    },
  },
});

export default modalSlice.reducer;

export const { show, hide } = modalSlice.actions;
