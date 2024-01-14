import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenData } from "../types";

interface AuthState {
  token?: string;
  username?: string;
  id?: string;
}

const initialState: AuthState = {};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (_state, action: PayloadAction<TokenData>) => {
      return action.payload;
    },
    removeCredentials: () => {
      return {};
    },
  },
});

export default authSlice.reducer;

export const { setCredentials, removeCredentials } = authSlice.actions;
