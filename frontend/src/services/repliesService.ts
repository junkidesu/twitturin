import { NewReply, Reply } from "../types";
import { api } from "./api";

export const repliesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTweetReplies: builder.query<Reply[], string>({
      query: (id) => ({
        url: `replies?tweet=${id}`,
      }),
      providesTags: (_result, _error, arg) => [{ type: "Reply", id: arg }],
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
    }),
    likeReply: builder.mutation<Reply, { id: string }>({
      query: ({ id }) => ({
        url: `replies/${id}/likes`,
        method: "POST",
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Reply", id: result?.tweet }] : ["Reply"],
    }),
  }),
});

export const {
  useGetTweetRepliesQuery,
  useReplyMutation,
  useLikeReplyMutation,
} = repliesApi;
