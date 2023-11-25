import { api } from "./api";
import { NewTweet, Tweet } from "../types";
import { usersApi } from "./usersService";

export const tweetsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTweets: builder.query<Tweet[], void>({
      query: () => ({
        url: "tweets",
      }),
      providesTags: ["Tweet"],
    }),
    addTweet: builder.mutation<Tweet, NewTweet>({
      query: (newTweet) => ({
        url: "tweets",
        method: "POST",
        body: newTweet,
      }),
      invalidatesTags: ["Tweet", "User"],
    }),
    likeTweet: builder.mutation<Tweet, string>({
      query: (id) => ({
        url: `tweets/${id}/likes`,
        method: "POST",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data: likedTweet } = await queryFulfilled;

          dispatch(
            tweetsApi.util.updateQueryData("getTweets", undefined, (draft) => {
              return draft.map((t) => (t.id !== id ? t : likedTweet));
            })
          );

          dispatch(
            usersApi.util.updateQueryData("getUsers", undefined, (draft) => {
              const user = draft.find((u) => u.id === likedTweet.author.id);

              if (!user) return draft;

              const newUser = {
                ...user,
                tweets: user.tweets.map((t) => (t.id !== id ? t : likedTweet)),
              };

              return draft.map((u) => (u.id !== newUser.id ? u : newUser));
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
      async onQueryStarted({ id, userId }, { dispatch, queryFulfilled }) {
        const patchResult1 = dispatch(
          tweetsApi.util.updateQueryData("getTweets", undefined, (draft) => {
            const tweet = draft.find((t) => t.id === id);

            if (!tweet) return draft;

            const newTweet = {
              ...tweet,
              likedBy: tweet.likedBy.filter((u) => u.id !== userId),
              likes: tweet.likes - 1,
            };

            return draft.map((t) => (t.id !== id ? t : newTweet));
          })
        );

        const patchResult2 = dispatch(
          usersApi.util.updateQueryData("getUsers", undefined, (draft) => {
            const user = draft.find((u) => u.id === userId);

            if (!user) return draft;

            const tweet = user?.tweets.find((t) => t.id === id);

            if (!tweet) return draft;

            const newTweet = {
              ...tweet,
              likedBy: tweet.likedBy.filter((u) => u.id !== userId),
              likes: tweet.likes - 1,
            };

            const newUser = {
              ...user,
              tweets: user.tweets.map((t) => (t.id !== id ? t : newTweet)),
            };

            return draft.map((u) => (u.id !== newUser.id ? u : newUser));
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult1.undo();
          patchResult2.undo();
        }
      },
    }),
    getTweet: builder.query<Tweet, string>({
      query: (id) => ({ url: `tweets/${id}` }),
    }),
  }),
});

export const {
  useGetTweetsQuery,
  useAddTweetMutation,
  useLikeTweetMutation,
  useUnlikeTweetMutation,
} = tweetsApi;
