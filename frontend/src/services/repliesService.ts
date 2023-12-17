import { NewReply, Reply } from "../types";
import { api } from "./api";
import { tweetsApi } from "./tweetsService";

export const repliesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTweetReplies: builder.query<Reply[], string>({
      query: (id) => ({
        url: `/tweets/${id}/replies`,
      }),
      providesTags: (_result, _error, arg) => [{ type: "Reply", id: arg }],
    }),
    getUserReplies: builder.query<Reply[], string>({
      query: (id) => ({
        url: `users/${id}/replies`,
      }),
    }),
    reply: builder.mutation<Reply, NewReply>({
      query: ({ content, parent, parentId: id }) => ({
        url: parent === "tweet" ? `tweets/${id}/replies` : `replies/${id}`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: "Reply", id: result.tweet },
              { type: "Tweet", id: result.tweet },
            ]
          : ["Reply"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data: addedReply } = await queryFulfilled;

          dispatch(
            tweetsApi.util.updateQueryData("getTweets", undefined, (draft) => {
              const tweet = draft.find((t) => t.id === addedReply.tweet);

              const newTweet = { ...tweet!, replyCount: tweet!.replyCount + 1 };

              return draft.map((t) => (t.id !== newTweet.id ? t : newTweet));
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    likeReply: builder.mutation<Reply, { id: string }>({
      query: ({ id }) => ({
        url: `replies/${id}/likes`,
        method: "POST",
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Reply", id: result?.tweet }] : ["Reply"],
    }),
    unlikeReply: builder.mutation<undefined, string>({
      query: (id) => ({
        url: `replies/${id}/likes`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reply"],
    }),
  }),
});

export const {
  useGetTweetRepliesQuery,
  useGetUserRepliesQuery,
  useReplyMutation,
  useLikeReplyMutation,
} = repliesApi;
