import { api } from "./api";
import { TokenData, Credentials } from "../types";
import storageService from "./storageService";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TokenData, Credentials>({
      query: (credentials: Credentials) => ({
        url: "auth",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data: tokenData } = await queryFulfilled;

          storageService.setAuthUser(tokenData);
        } catch (error) {
          console.log(error);
        }
      }
    }),
  }),
});

export const { useLoginMutation } = extendedApi;
