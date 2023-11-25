import { NewReply, Reply } from "../types";
import { api } from "./api";
import { tweetsApi } from "./tweetsService";

export const repliesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    replyToTweet: builder.mutation<Reply, NewReply>({
      query: ({ content, parentId: id }) => ({
        url: `tweets/${id}/replies`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: ["User"],
      async onQueryStarted({ parentId: id }, { dispatch, queryFulfilled }) {
        try {
          const { data: addedReply } = await queryFulfilled;

          dispatch(
            tweetsApi.util.updateQueryData("getTweets", undefined, (draft) => {
              const tweet = draft.find((t) => t.id === id);

              if (!tweet) return draft;

              const newTweet = {
                ...tweet,
                replies: tweet.replies.concat(addedReply),
                replyCount: tweet.replyCount + 1,
              };

              return draft.map((t) => (t.id !== id ? t : newTweet));
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    replyToReply: builder.mutation<Reply, NewReply>({
      query: ({ content, parentId: id }) => ({
        url: `/replies/${id}`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: ["Tweet", "User"],
    }),
  }),
});

export const { useReplyToTweetMutation, useReplyToReplyMutation } = repliesApi;
