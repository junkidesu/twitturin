import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Credentials, TokenData } from "../types";
import authService from "../services/authService";
import { AppDispatch } from "../store";

interface AuthState {
  tokenData?: TokenData;
}

const initialState: AuthState = {};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (_state, action: PayloadAction<TokenData>) => {
      return { tokenData: action.payload };
    },
    removeCredentials: () => {
      return {};
    },
  },
});

export default authSlice.reducer;

export const { setCredentials, removeCredentials } = authSlice.actions;

export const authenticate = (credentials: Credentials) => {
  return async (dispatch: AppDispatch) => {
    const tokenData = await authService.login(credentials);

    dispatch(setCredentials(tokenData));
  };
};
