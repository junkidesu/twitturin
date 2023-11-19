import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Credentials, TokenData } from "../types";
import authService from "../services/authService";
import tweetsService from "../services/tweetsService";
import { AppDispatch } from "../store";

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

export const authenticate = (credentials: Credentials) => {
  return async (dispatch: AppDispatch) => {
    const tokenData = await authService.login(credentials);

    tweetsService.setToken(tokenData.token);

    dispatch(setCredentials(tokenData));
  };
};
