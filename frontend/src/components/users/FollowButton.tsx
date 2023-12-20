import styled from "styled-components";
import { icons } from "../../assets";
import { useAppSelector } from "../../hooks/store";
import {
  useFollowMutation,
  useUnfollowMutation,
  useGetFollowingQuery,
} from "../../services/usersService";
import { User } from "../../types";
import IconButton from "../core/buttons/IconButton";
import { useEffect } from "react";
import useAlert from "../../hooks/useAlert";

interface Props {
  user: User;
}

const FollowIconButton = styled(IconButton)`
  align-items: center;
  justify-content: center;
`;

const FollowButton = ({ user }: Props) => {
  const id = useAppSelector(({ auth }) => auth.id);
  const [follow, { isError: isFollowError, error: followError }] =
    useFollowMutation();
  const [unfollow, { isError: isUnfollowError, error: unfollowError }] =
    useUnfollowMutation();
  const alertUser = useAlert();
  const { data: following, isLoading } = useGetFollowingQuery(id!, {
    skip: !id,
  });

  useEffect(() => {
    if (isFollowError) {
      if (followError) {
        if ("data" in followError) {
          if (
            followError.data &&
            typeof followError.data === "object" &&
            "error" in followError.data
          ) {
            const errorMessage: string =
              "error" in followError.data
                ? (followError.data.error as string)
                : "Some error has occured! (Check the logs)";

            alertUser(errorMessage);
          }
        }
      }
    }
  }, [isFollowError, followError, alertUser]);

  useEffect(() => {
    if (isUnfollowError) {
      if (unfollowError) {
        if ("data" in unfollowError) {
          if (
            unfollowError.data &&
            typeof unfollowError.data === "object" &&
            "error" in unfollowError.data
          ) {
            const errorMessage: string =
              "error" in unfollowError.data
                ? (unfollowError.data.error as string)
                : "Some error has occured! (Check the logs)";

            alertUser(errorMessage);
          }
        }
      }
    }
  }, [isUnfollowError, unfollowError, alertUser]);

  if (!id || isLoading || !following || user.id === id) return null;

  const followedByMe = following.map((u) => u.id).includes(user.id);

  const handleFollow = async () => {
    await follow(user.id);
  };

  const handleUnfollow = async () => {
    await unfollow(user.id);
  };

  return (
    <FollowIconButton
      icon={followedByMe ? <icons.UserCheckIcon /> : <icons.UserPlusIcon />}
      label={followedByMe ? "following" : "follow"}
      onClick={followedByMe ? handleUnfollow : handleFollow}
    />
  );
};

export default FollowButton;
