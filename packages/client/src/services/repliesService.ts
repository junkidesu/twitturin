import { RootState } from "../store";
import { NewReply, Reply } from "../types";
import { api } from "./api";
import { tweetsApi } from "./tweetsService";
import { usersApi } from "./usersService";
import { updateReplies, like, unlike } from "../util/replyHelpers";

export const repliesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    reply: builder.mutation<Reply, NewReply>({
      query: ({ content, parent, parentId: id }) => ({
        url: parent === "tweet" ? `tweets/${id}/replies` : `replies/${id}`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: "UserReplies", id: result.author.id },
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
    likeReply: builder.mutation<Reply, Reply>({
      query: (toLike) => ({
        url: `replies/${toLike.id}/likes`,
        method: "POST",
      }),
      async onQueryStarted(toLike, { dispatch, getState, queryFulfilled }) {
        const userId = (getState() as RootState).auth.id!;
        const updateTweetReply = dispatch(
          tweetsApi.util.updateQueryData(
            "getTweetReplies",
            toLike.tweet,
            updateReplies(toLike.id, like(userId))
          )
        );

        const updateUserReply = dispatch(
          usersApi.util.updateQueryData(
            "getUserReplies",
            toLike.author.id,
            updateReplies(toLike.id, like(userId))
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          updateTweetReply.undo();
          updateUserReply.undo();
        }
      },
    }),
    unlikeReply: builder.mutation<void, Reply>({
      query: (toUnlike) => ({
        url: `replies/${toUnlike.id}/likes`,
        method: "DELETE",
      }),
      async onQueryStarted(toUnlike, { dispatch, getState, queryFulfilled }) {
        const userId = (getState() as RootState).auth.id!;
        const updateTweetReply = dispatch(
          tweetsApi.util.updateQueryData(
            "getTweetReplies",
            toUnlike.tweet,
            updateReplies(toUnlike.id, unlike(userId))
          )
        );

        const updateUserReply = dispatch(
          usersApi.util.updateQueryData(
            "getUserReplies",
            toUnlike.author.id,
            updateReplies(toUnlike.id, unlike(userId))
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          updateTweetReply.undo();
          updateUserReply.undo();
        }
      },
    }),
  }),
});

export const {
  useReplyMutation,
  useLikeReplyMutation,
  useUnlikeReplyMutation,
} = repliesApi;
