import { api } from "./api";
import { NewTweet, Tweet, User } from "../types";

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
      invalidatesTags: ["Tweet"],
    }),
    likeTweet: builder.mutation<User, string>({
      query: (id) => ({
        url: `tweets/${id}/likes`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Tweet", id: arg }],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data: like } = await queryFulfilled;

          dispatch(
            tweetsApi.util.updateQueryData("getTweets", undefined, (draft) => {
              const tweet = draft.find((t) => t.id === id);

              if (!tweet) return draft;

              const likedTweet = {
                ...tweet,
                likedBy: tweet.likedBy.concat(like.id),
                likes: tweet.likes + 1,
              };

              return draft.map((t) => (t.id !== id ? t : likedTweet));
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    unlikeTweet: builder.mutation<void, { id: string; userId: string }>({
      query: ({ id, userId }) => ({
        url: `tweets/${id}/likes/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Tweet", id: arg.id }],
      async onQueryStarted({ id, userId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
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
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTweetsQuery,
  useGetTweetQuery,
  useAddTweetMutation,
  useLikeTweetMutation,
  useUnlikeTweetMutation,
} = tweetsApi;
