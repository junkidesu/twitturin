import { api } from "./api";
import { NewTweet, Tweet, User } from "../types";
import { RootState } from "../store";
import { usersApi } from "./usersService";

export const tweetsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTweets: builder.query<Tweet[], void>({
      query: () => ({
        url: "tweets",
      }),
      providesTags: ["Tweet"],
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
      invalidatesTags: (result) =>
        result
          ? [{ type: "Tweet" }, { type: "UserTweets", id: result.author.id }]
          : ["Tweet"],
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
    likeTweet: builder.mutation<User, Tweet>({
      query: (toLike) => ({
        url: `tweets/${toLike.id}/likes`,
        method: "POST",
      }),
      async onQueryStarted(toLike, { dispatch, getState, queryFulfilled }) {
        const userId = (getState() as RootState).auth.id!;

        const updateSpecificTweet = dispatch(
          tweetsApi.util.updateQueryData("getTweet", toLike.id, (draft) => {
            return {
              ...draft,
              likedBy: draft.likedBy.concat(userId),
              likes: draft.likes + 1,
            };
          })
        );

        const updateAllTweets = dispatch(
          tweetsApi.util.updateQueryData("getTweets", undefined, (draft) => {
            const tweet = draft.find((t) => t.id === toLike.id);

            if (!tweet) return draft;

            const likedTweet = {
              ...tweet,
              likedBy: tweet.likedBy.concat(userId),
              likes: tweet.likes + 1,
            };

            return draft.map((t) => (t.id !== toLike.id ? t : likedTweet));
          })
        );

        const updateUserTweets = dispatch(
          usersApi.util.updateQueryData(
            "getUserTweets",
            toLike.author.id,
            (draft) => {
              const tweet = draft.find((t) => t.id === toLike.id);

              if (!tweet) return draft;

              const likedTweet = {
                ...tweet,
                likedBy: tweet.likedBy.concat(userId),
                likes: tweet.likes + 1,
              };

              return draft.map((t) => (t.id !== toLike.id ? t : likedTweet));
            }
          )
        );

        const updateLikedTweets = dispatch(
          usersApi.util.updateQueryData("getLikedTweets", userId, (draft) => {
            const likedTweet = {
              ...toLike,
              likedBy: toLike.likedBy.concat(userId),
              likes: toLike.likes + 1,
            };

            return [likedTweet, ...draft];
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          updateSpecificTweet.undo();
          updateAllTweets.undo();
          updateUserTweets.undo();
          updateLikedTweets.undo();
        }
      },
    }),
    unlikeTweet: builder.mutation<void, Tweet>({
      query: (toUnlike) => ({
        url: `tweets/${toUnlike.id}/likes/`,
        method: "DELETE",
      }),
      async onQueryStarted(toUnlike, { dispatch, queryFulfilled, getState }) {
        const userId = (getState() as RootState).auth.id!;

        const updateSpecificTweet = dispatch(
          tweetsApi.util.updateQueryData("getTweet", toUnlike.id, (draft) => {
            return {
              ...draft,
              likedBy: draft.likedBy.filter((u) => u !== userId),
              likes: draft.likes - 1,
            };
          })
        );

        const updateAllTweets = dispatch(
          tweetsApi.util.updateQueryData("getTweets", undefined, (draft) => {
            const tweet = draft.find((t) => t.id === toUnlike.id);

            if (!tweet) return draft;

            const newTweet = {
              ...tweet,
              likedBy: tweet.likedBy.filter((u) => u !== userId),
              likes: tweet.likes - 1,
            };

            return draft.map((t) => (t.id !== toUnlike.id ? t : newTweet));
          })
        );

        const updateUserTweets = dispatch(
          usersApi.util.updateQueryData(
            "getUserTweets",
            toUnlike.author.id,
            (draft) => {
              const tweet = draft.find((t) => t.id === toUnlike.id);

              if (!tweet) return draft;

              const newTweet = {
                ...tweet,
                likedBy: tweet.likedBy.filter((u) => u !== userId),
                likes: tweet.likes - 1,
              };

              return draft.map((t) => (t.id !== toUnlike.id ? t : newTweet));
            }
          )
        );

        const updateLikedTweets = dispatch(
          usersApi.util.updateQueryData("getLikedTweets", userId, (draft) => {
            return draft.filter((t) => t.id !== toUnlike.id);
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          updateSpecificTweet.undo();
          updateAllTweets.undo();
          updateUserTweets.undo();
          updateLikedTweets.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTweetsQuery,
  useGetTweetQuery,
  useAddTweetMutation,
  useEditTweetMutation,
  useLikeTweetMutation,
  useUnlikeTweetMutation,
} = tweetsApi;
