import { api } from "./api";
import { TokenData, Credentials } from "../types";

const extendedApi = api.injectEndpoints({
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

export const { useLoginMutation } = extendedApi;
