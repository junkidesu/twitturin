import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SignUpFormValues, Tweet, User } from "../types";
import { AppDispatch } from "../store";
import usersService from "../services/usersService";
import { authenticate } from "./authReducer";

const usersSlice = createSlice({
  name: "users",
  initialState: [] as User[],
  reducers: {
    setUsers: (_state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      return state.concat(action.payload);
    },
    setUserTweet: (state, action: PayloadAction<Tweet>) => {
      const tweet = action.payload;

      const userId = tweet.author.id;

      const user = state.find((u) => u.id === userId);

      if (!user) return state;

      const newUser = {
        ...user,
        tweets: user.tweets.map((t) => (t.id !== tweet.id ? t : tweet)),
      };

      return state.map((u) => (u.id !== userId ? u : newUser));
    },
  },
});

export default usersSlice.reducer;

export const { setUsers, addUser, setUserTweet } = usersSlice.actions;

export const initializeUsers = () => async (dispatch: AppDispatch) => {
  const users = await usersService.getAll();
  dispatch(setUsers(users));
};

export const signUp =
  (formValues: SignUpFormValues) => async (dispatch: AppDispatch) => {
    try {
      const newUser = await usersService.create(formValues);

      dispatch(addUser(newUser));

      dispatch(
        authenticate({
          username: formValues.username,
          password: formValues.password,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
