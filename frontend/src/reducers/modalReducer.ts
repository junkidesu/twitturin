import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: false,
  reducers: {
    showModal: () => {
      return true;
    },
    hideModal: () => {
      return false;
    },
  },
});

export default modalSlice.reducer;

export const { showModal, hideModal } = modalSlice.actions;
