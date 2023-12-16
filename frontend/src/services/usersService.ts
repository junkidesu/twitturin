import { NewUser, User } from "../types";
import { api } from "./api";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: "users",
      }),
      providesTags: ["User"],
    }),
    getUser: builder.query<User, string>({
      query: (id) => ({
        url: `users/${id}`,
      }),
      providesTags: (_result, _error, arg) => [{ type: "User", id: arg }],
    }),
    addUser: builder.mutation<User, NewUser>({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),
    getFollowers: builder.query<User[], string>({
      query: (id) => ({
        url: `users/${id}/followers`,
      }),
    }),
    getFollowing: builder.query<User[], string>({
      query: (id) => ({
        url: `users/${id}/following`,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useGetFollowersQuery,
  useGetFollowingQuery,
} = usersApi;
