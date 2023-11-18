import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../types";
import { AppDispatch } from "../store";
import usersService from "../services/usersService";

const usersSlice = createSlice({
  name: "users",
  initialState: [] as User[],
  reducers: {
    setUsers: (_state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
  },
});

export default usersSlice.reducer;

export const { setUsers } = usersSlice.actions;

export const initializeUsers = () => async (dispatch: AppDispatch) => {
  const users = await usersService.getAll();
  dispatch(setUsers(users));
};
