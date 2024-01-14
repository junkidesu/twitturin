import { User } from "../types";
import { api } from "./api";
import { usersApi } from "./usersService";

type PictureProps = {
  id: string;
  body: FormData;
};

export const avatarApi = api.injectEndpoints({
  endpoints: (builder) => ({
    setAvatar: builder.mutation<User, PictureProps>({
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
    removeAvatar: builder.mutation<User, User>({
      query: (user) => ({
        url: `users/${user.id}/profilePicture`,
        method: "DELETE",
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
  }),
});

export const { useSetAvatarMutation, useRemoveAvatarMutation } =
  avatarApi;
