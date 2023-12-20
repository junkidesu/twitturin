import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type AlertState = {
  message?: string;
};

const initialState: AlertState = { message: undefined };

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setMessage: (_state, action: PayloadAction<string>) => {
      return {
        message: action.payload,
      };
    },
    removeMessage: () => {
      return {};
    },
  },
});

export const { setMessage, removeMessage } = alertSlice.actions;

export default alertSlice.reducer;
