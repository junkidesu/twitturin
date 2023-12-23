import { api } from "./api";
import { NewTweet, Reply, Tweet, User } from "../types";
import { RootState } from "../store";
import { usersApi } from "./usersService";
import { updateTweetInList, like, unlike } from "../util/tweetHelpers";

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
    getTweetReplies: builder.query<Reply[], string>({
      query: (id) => ({
        url: `tweets/${id}/replies`,
      }),
      providesTags: (_result, _error, arg) => [{ type: "Reply", id: arg }],
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
    deleteTweet: builder.mutation<void, Tweet>({
      query: (toDelete) => ({
        url: `tweets/${toDelete.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Tweet", id: arg.id },
        { type: "Tweet", id: undefined },
        { type: "UserTweets", id: arg.author.id },
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
          tweetsApi.util.updateQueryData("getTweet", toLike.id, like(userId))
        );

        const updateAllTweets = dispatch(
          tweetsApi.util.updateQueryData(
            "getTweets",
            undefined,
            updateTweetInList(toLike.id, like(userId))
          )
        );

        const updateUserTweets = dispatch(
          usersApi.util.updateQueryData(
            "getUserTweets",
            toLike.author.id,
            updateTweetInList(toLike.id, like(userId))
          )
        );

        const updateLikedTweets = dispatch(
          usersApi.util.updateQueryData("getLikedTweets", userId, (draft) => {
            const likedTweet = like(userId)(toLike);

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
          tweetsApi.util.updateQueryData(
            "getTweet",
            toUnlike.id,
            unlike(userId)
          )
        );

        const updateAllTweets = dispatch(
          tweetsApi.util.updateQueryData(
            "getTweets",
            undefined,
            updateTweetInList(toUnlike.id, unlike(userId))
          )
        );

        const updateUserTweets = dispatch(
          usersApi.util.updateQueryData(
            "getUserTweets",
            toUnlike.author.id,
            updateTweetInList(toUnlike.id, unlike(userId))
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
  useGetTweetRepliesQuery,
  useAddTweetMutation,
  useEditTweetMutation,
  useDeleteTweetMutation,
  useLikeTweetMutation,
  useUnlikeTweetMutation,
} = tweetsApi;
