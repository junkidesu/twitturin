import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ReleaseInformation } from "../types";

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com",
  }),
  endpoints: (builder) => ({
    getLatestRelease: builder.query<ReleaseInformation, undefined>({
      query: () => ({
        url: "repos/extractive-mana-pulse/Twittur-In-/releases/latest",
      }),
    }),
  }),
});

export const { useGetLatestReleaseQuery } = githubApi;
