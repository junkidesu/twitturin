import { api } from "./api";
import { NewTweet, Tweet } from "../types";

const extendedApi = api.injectEndpoints({
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
      invalidatesTags: ["Tweet"],
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
            extendedApi.util.updateQueryData(
              "getTweets",
              undefined,
              (draft) => {
                return draft.map((t) => (t.id !== id ? t : likedTweet));
              }
            )
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
      async onQueryStarted({ id, userId }, { dispatch }) {
        try {
          dispatch(
            extendedApi.util.updateQueryData(
              "getTweets",
              undefined,
              (draft) => {
                const tweet = draft.find((t) => t.id === id);

                if (!tweet) return draft;

                const newTweet = {
                  ...tweet,
                  likedBy: tweet.likedBy.filter((u) => u.id !== userId),
                  likes: tweet.likes - 1,
                };

                return draft.map((t) => (t.id !== id ? t : newTweet));
              }
            )
          );
        } catch (error) {
          console.log(error);
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
} = extendedApi;
