import { User } from "../types";
import { api } from "./api";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: "users",
      }),
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
