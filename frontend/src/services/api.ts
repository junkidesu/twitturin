import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Credentials, TokenData } from "../types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    login: builder.mutation<TokenData, Credentials>({
      query: (credentials: Credentials) => ({
        url: "auth",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = api;
