import { EditUser, NewUser, Reply, Tweet, User } from "../types";
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
    getUserTweets: builder.query<Tweet[], string>({
      query: (id) => ({
        url: `users/${id}/tweets`,
      }),
      providesTags: (_result, _error, arg) => [{ type: "UserTweets", id: arg }],
    }),
    getUserReplies: builder.query<Reply[], string>({
      query: (id) => ({
        url: `users/${id}/replies`,
      }),
      providesTags: (_result, _error, arg) => [
        { type: "UserReplies", id: arg },
      ],
    }),
    getLikedTweets: builder.query<Tweet[], string>({
      query: (id) => ({
        url: `users/${id}/likes`,
      }),
    }),
    addUser: builder.mutation<User, NewUser>({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),
    editUser: builder.mutation<User, { id: string; body: EditUser }>({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled;
          dispatch(usersApi.util.updateQueryData("getUser", id, () => user));
          dispatch(
            usersApi.util.updateQueryData("getUsers", undefined, (draft) => {
              return draft.map((u) => (u.id !== id ? u : user));
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    deleteUser: builder.mutation<undefined, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetUserTweetsQuery,
  useGetLikedTweetsQuery,
  useGetUserRepliesQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = usersApi;
