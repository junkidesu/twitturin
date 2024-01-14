import styled from "styled-components";
import { icons } from "../../assets";
import { useAppSelector } from "../../hooks/store";
import {
  useFollowMutation,
  useUnfollowMutation,
  useGetFollowingQuery,
} from "../../services/followService";
import { User } from "../../types";
import IconButton from "../core/buttons/IconButton";
import useAlert from "../../hooks/useAlert";
import useLoadingStripe from "../../hooks/useLoadingStripe";

interface Props {
  user: User;
}

const FollowIconButton = styled(IconButton)`
  align-items: center;
  justify-content: center;
`;

const FollowButton = ({ user }: Props) => {
  const id = useAppSelector(({ auth }) => auth.id);
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();
  const { errorAlert } = useAlert();
  const { data: following, isLoading } = useGetFollowingQuery(id!, {
    skip: !id,
  });
  const { showLoadingStripe, hideLoadingStripe } = useLoadingStripe();

  if (!id || isLoading || !following || user.id === id) return null;

  const followedByMe = following.map((u) => u.id).includes(user.id);

  const handleFollow = async () => {
    showLoadingStripe();

    try {
      await follow(user.id).unwrap();
    } catch (error) {
      errorAlert(error);
    }

    hideLoadingStripe();
  };

  const handleUnfollow = async () => {
    showLoadingStripe();

    try {
      await unfollow(user.id).unwrap();
    } catch (error) {
      errorAlert(error);
    }

    hideLoadingStripe();
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
