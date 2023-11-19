import { User } from "../types";
import { api } from "./api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: "users",
      }),
    }),
  }),
});

export const { useGetUsersQuery } = extendedApi;
