import { api } from "./api";
import { NewTweet, Tweet, User } from "../types";
import { RootState } from "../store";

export const tweetsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTweets: builder.query<Tweet[], string | undefined>({
      query: (author) => ({
        url: author ? `users/${author}/tweets` : "tweets",
      }),
      providesTags: ["Tweet"],
    }),
    getUserTweets: builder.query<Tweet[], string>({
      query: (id) => ({
        url: `users/${id}/tweets`,
      }),
      providesTags: (_result, _error, arg) => [
        { type: "User", id: arg },
        { type: "Tweet" },
      ],
    }),
    getLikedTweets: builder.query<Tweet[], string>({
      query: (id) => ({
        url: `users/${id}/likes`,
      }),
    }),
    getTweet: builder.query<Tweet, string>({
      query: (id) => ({
        url: `tweets/${id}`,
      }),
      providesTags: (result) =>
        result ? [{ type: "Tweet", id: result.id }] : ["Tweet"],
    }),
    addTweet: builder.mutation<Tweet, NewTweet>({
      query: (newTweet) => ({
        url: "tweets",
        method: "POST",
        body: newTweet,
      }),
      invalidatesTags: ["Tweet"],
    }),
    editTweet: builder.mutation<Tweet, { id: string; content: string }>({
      query: ({ id, content }) => ({
        url: `tweets/${id}`,
        method: "PUT",
        body: { content },
      }),
      invalidatesTags: (_result, _error, args) => [
        { type: "Tweet", id: args.id },
        { type: "Tweet" },
      ],
    }),
    likeTweet: builder.mutation<User, string>({
      query: (id) => ({
        url: `tweets/${id}/likes`,
        method: "POST",
      }),
      // invalidatesTags: (_result, _error, arg) => [{ type: "Tweet", id: arg }],
      async onQueryStarted(id, { dispatch, getState, queryFulfilled }) {
        const userId = (getState() as RootState).auth!.id!;

        const updateSpecificTweet = dispatch(
          tweetsApi.util.updateQueryData("getTweet", id, (draft) => {
            return {
              ...draft,
              likedBy: draft.likedBy.concat(userId),
              likes: draft.likes + 1,
            };
          })
        );

        const updateAllTweets = dispatch(
          tweetsApi.util.updateQueryData("getTweets", undefined, (draft) => {
            const tweet = draft.find((t) => t.id === id);

            if (!tweet) return draft;

            const likedTweet = {
              ...tweet,
              likedBy: tweet.likedBy.concat(userId),
              likes: tweet.likes + 1,
            };

            return draft.map((t) => (t.id !== id ? t : likedTweet));
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          updateSpecificTweet.undo();
          updateAllTweets.undo();
        }
      },
    }),
    unlikeTweet: builder.mutation<void, string>({
      query: (id) => ({
        url: `tweets/${id}/likes/`,
        method: "DELETE",
      }),
      // invalidatesTags: (_result, _error, arg) => [
      //   { type: "Tweet", id: arg.id },
      // ],
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        const userId = (getState() as RootState).auth?.id;

        const updateSpecificTweet = dispatch(
          tweetsApi.util.updateQueryData("getTweet", id, (draft) => {
            return {
              ...draft,
              likedBy: draft.likedBy.filter((u) => u !== userId),
              likes: draft.likes - 1,
            };
          })
        );

        const updateAllTweets = dispatch(
          tweetsApi.util.updateQueryData("getTweets", undefined, (draft) => {
            const tweet = draft.find((t) => t.id === id);

            if (!tweet) return draft;

            const newTweet = {
              ...tweet,
              likedBy: tweet.likedBy.filter((u) => u !== userId),
              likes: tweet.likes - 1,
            };

            return draft.map((t) => (t.id !== id ? t : newTweet));
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          updateSpecificTweet.undo();
          updateAllTweets.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTweetsQuery,
  useGetLikedTweetsQuery,
  useGetTweetQuery,
  useAddTweetMutation,
  useEditTweetMutation,
  useLikeTweetMutation,
  useUnlikeTweetMutation,
} = tweetsApi;
