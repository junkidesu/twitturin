import { RootState } from "../store";
import { EditUser, NewUser, User } from "../types";
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
    updateProfilePicture: builder.mutation<
      User,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `users/${id}/profilePicture`,
        method: "POST",
        formData: true,
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
    getFollowers: builder.query<User[], string>({
      query: (id) => ({
        url: `users/${id}/followers`,
      }),
    }),
    getFollowing: builder.query<User[], string>({
      query: (id) => ({
        url: `users/${id}/following`,
      }),
      providesTags: (_result, _error, arg) => [{ type: "Following", id: arg }],
    }),
    follow: builder.mutation<User, string>({
      query: (id) => ({
        url: `users/following/${id}`,
        method: "POST",
      }),
      async onQueryStarted(_id, { dispatch, getState, queryFulfilled }) {
        const userId = (getState() as RootState).auth.id!;

        try {
          const { data: followedUser } = await queryFulfilled;

          dispatch(
            usersApi.util.updateQueryData("getFollowing", userId, (draft) => {
              return draft.concat(followedUser);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    unfollow: builder.mutation<undefined, string>({
      query: (id) => ({
        url: `users/following/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { getState, dispatch, queryFulfilled }) {
        const userId = (getState() as RootState).auth.id!;

        const patchResult = dispatch(
          usersApi.util.updateQueryData("getFollowing", userId, (draft) => {
            return draft.filter((u) => u.id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useEditUserMutation,
  useUpdateProfilePictureMutation,
  useDeleteUserMutation,
  useGetFollowersQuery,
  useGetFollowingQuery,
  useFollowMutation,
  useUnfollowMutation,
} = usersApi;
