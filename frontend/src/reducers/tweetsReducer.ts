import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NewTweet, Tweet } from "../types";
import tweetsService from "../services/tweetsService";
import { AppDispatch } from "../store";
import { appendTweetToUser, setUserTweet } from "./usersReducer";

const tweetsSlice = createSlice({
  name: "tweets",
  initialState: [] as Tweet[],
  reducers: {
    setTweets: (_state, action: PayloadAction<Tweet[]>) => {
      return action.payload;
    },
    appendTweet: (state, action: PayloadAction<Tweet>) => {
      return state.concat(action.payload);
    },
    setTweet: (state, action: PayloadAction<Tweet>) => {
      const tweet = action.payload;

      return state.map((t) => (t.id !== tweet.id ? t : tweet));
    },
    removeLike: (
      state,
      action: PayloadAction<{ id: string; userId: string }>
    ) => {
      const { id, userId } = action.payload;

      const tweet = state.find((t) => t.id === id);

      if (!tweet) return state;

      const newTweet = {
        ...tweet,
        likedBy: tweet.likedBy.filter((u) => u.id !== userId),
        likes: tweet.likes - 1,
      };

      return state.map((t) => (t.id !== id ? t : newTweet));
    },
  },
});

export default tweetsSlice.reducer;

export const { setTweet, appendTweet, setTweets, removeLike } =
  tweetsSlice.actions;

export const initializeTweets = () => async (dispatch: AppDispatch) => {
  const tweets: Tweet[] = await tweetsService.getAll();

  dispatch(setTweets(tweets));
};

export const postTweet =
  (newTweet: NewTweet) => async (dispatch: AppDispatch) => {
    try {
      const addedTweet = await tweetsService.add(newTweet);

      dispatch(appendTweet(addedTweet));
      dispatch(appendTweetToUser(addedTweet));
    } catch (error) {
      console.log(error);
    }
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

export const unlikeTweet =
  (id: string, userId: string) => async (dispatch: AppDispatch) => {
    try {
      await tweetsService.removeLike(id, userId);

      dispatch(removeLike({ id, userId }));
    } catch (error) {
      console.log(error);
    }
  };
