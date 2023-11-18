import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Tweet } from "../types";
import tweetsService from "../services/tweetsService";
import { AppDispatch } from "../store";

const tweetsSlice = createSlice({
  name: "tweets",
  initialState: [] as Tweet[],
  reducers: {
    setTweets: (_state, action: PayloadAction<Tweet[]>) => {
      return action.payload;
    },
  },
});

export default tweetsSlice.reducer;

export const { setTweets } = tweetsSlice.actions;

export const initializeTweets = () => async (dispatch: AppDispatch) => {
  const tweets: Tweet[] = await tweetsService.getAll();

  dispatch(setTweets(tweets));
};
