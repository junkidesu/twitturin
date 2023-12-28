import { RootState } from "../store";
import { User } from "../types";
import { api } from "./api";

export const followApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
        url: `following/${id}`,
        method: "POST",
      }),
      async onQueryStarted(_id, { dispatch, getState, queryFulfilled }) {
        const userId = (getState() as RootState).auth.id!;

        try {
          const { data: followedUser } = await queryFulfilled;

          dispatch(
            followApi.util.updateQueryData("getFollowing", userId, (draft) => {
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
        url: `following/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { getState, dispatch, queryFulfilled }) {
        const userId = (getState() as RootState).auth.id!;

        const patchResult = dispatch(
          followApi.util.updateQueryData("getFollowing", userId, (draft) => {
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
  useGetFollowersQuery,
  useGetFollowingQuery,
  useFollowMutation,
  useUnfollowMutation,
} = followApi;
