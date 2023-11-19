import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Credentials, NewTweet, TokenData, Tweet } from "../types";
import { RootState } from "../store";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Tweet"],
  endpoints: (builder) => ({
    login: builder.mutation<TokenData, Credentials>({
      query: (credentials: Credentials) => ({
        url: "auth",
        method: "POST",
        body: credentials,
      }),
    }),
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
            api.util.updateQueryData("getTweets", undefined, (draft) => {
              return draft.map((t) => (t.id !== id ? t : likedTweet));
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getTweet: builder.query<Tweet, string>({
      query: (id) => ({ url: `/tweets/${id}` }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetTweetsQuery,
  useAddTweetMutation,
  useLikeTweetMutation,
  useGetTweetQuery,
} = api;
