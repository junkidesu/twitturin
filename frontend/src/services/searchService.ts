import { SearchResults } from "../types";
import { api } from "./api";

export const searchApi = api.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query<SearchResults, string>({
      query: (keyword) => ({
        url: `search?keyword=${keyword}`,
      }),
    }),
  }),
});

export const { useSearchQuery } = searchApi;
