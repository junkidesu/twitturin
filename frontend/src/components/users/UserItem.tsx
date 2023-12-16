import styled from "styled-components";
import Box from "../containers/Box";
import { User } from "../../types";
import Label from "../core/text/Label";
import { icons, pictures } from "../../assets";
import lightTheme from "../../themes/lightTheme";
import IconButton from "../core/buttons/IconButton";
import { useAppSelector } from "../../hooks/store";
import {
  useFollowMutation,
  useGetFollowingQuery,
  useUnfollowMutation,
} from "../../services/usersService";
import RouterLink from "../core/RouterLink";

const Wrapper = styled(Box)`
  cursor: pointer;
  justify-content: space-between;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProfilePicture = styled.img`
  width: 2em;
  height: 2em;
  box-sizing: border-box;
  border-radius: 10em;
  cursor: pointer;
`;

const DetailsWrapper = styled(Box)``;

interface Props {
  user: User;
}

const FollowButton = ({ user }: Props) => {
  const id = useAppSelector(({ auth }) => auth.id);
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();
  const { data: following, isLoading } = useGetFollowingQuery(id!, {
    skip: !id,
  });

  if (!id || isLoading || !following) return null;

  const followedByMe = following.map((u) => u.id).includes(user.id);

  const handleFollow = async () => {
    await follow(user.id);
  };

  const handleUnfollow = async () => {
    await unfollow(user.id);
  };

  return (
    <IconButton
      icon={followedByMe ? <icons.UserCheckIcon /> : <icons.UserPlusIcon />}
      label={followedByMe ? "following" : "follow"}
      onClick={followedByMe ? handleUnfollow : handleFollow}
    />
  );
};

const UserItem = ({ user }: Props) => {
  return (
    <Wrapper $horizontal $center $gap="1em" $width="100%" $pad="m">
      <Box $horizontal $center $gap="1em">
        <ProfilePicture src={pictures.emptyProfilePicture} />

        <DetailsWrapper>
          <RouterLink $size="small" $bold to={`/users/${user.id}`}>
            {user.fullName || "TwitturIn User"}
          </RouterLink>

          <Label $size="extraSmall" $color={lightTheme.colors.grey2}>
            @{user.username}
          </Label>
        </DetailsWrapper>
      </Box>

      <FollowButton user={user} />
    </Wrapper>
  );
};

export default UserItem;
