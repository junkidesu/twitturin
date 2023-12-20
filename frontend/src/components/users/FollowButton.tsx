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

interface Props {
  user: User;
}

const FollowIconButton = styled(IconButton)`
  /* align-items: center; */
  justify-content: center;
`;

const FollowButton = ({ user }: Props) => {
  const id = useAppSelector(({ auth }) => auth.id);
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();
  const { data: following, isLoading } = useGetFollowingQuery(id!, {
    skip: !id,
  });

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
