import { NewReply, Reply } from "../types";
import { api } from "./api";

export const repliesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    reply: builder.mutation<Reply, NewReply>({
      query: ({ content, tweet }) => ({
        url: `tweets/${tweet}/replies`,
        method: "POST",
        body: { content },
      }),
    }),
  }),
});

export const { useReplyMutation } = repliesApi;