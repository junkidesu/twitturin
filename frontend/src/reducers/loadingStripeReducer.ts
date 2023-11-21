import { createSlice } from "@reduxjs/toolkit";

const loadingStripeSlice = createSlice({
  name: "loadingStripe",
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

export default loadingStripeSlice.reducer;

export const { show, hide } = loadingStripeSlice.actions;
