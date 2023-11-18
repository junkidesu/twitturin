import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Tweet } from "../types";
import tweetsService from "../services/tweetsService";
import { AppDispatch } from "../store";
import { setUserTweet } from "./usersReducer";

const tweetsSlice = createSlice({
  name: "tweets",
  initialState: [] as Tweet[],
  reducers: {
    setTweets: (_state, action: PayloadAction<Tweet[]>) => {
      return action.payload;
    },
    setTweet: (state, action: PayloadAction<Tweet>) => {
      const tweet = action.payload;

      return state.map((t) => (t.id !== tweet.id ? t : tweet));
    },
  },
});

export default tweetsSlice.reducer;

export const { setTweet, setTweets } = tweetsSlice.actions;

export const initializeTweets = () => async (dispatch: AppDispatch) => {
  const tweets: Tweet[] = await tweetsService.getAll();

  dispatch(setTweets(tweets));
};

export const likeTweet = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const likedTweet = await tweetsService.like(id);

    dispatch(setTweet(likedTweet));
    dispatch(setUserTweet(likedTweet));
  } catch (error) {
    console.error(error);
  }
};
