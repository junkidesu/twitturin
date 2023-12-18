import styled from "styled-components";
import Box from "../containers/Box";
import { User } from "../../types";
import { pictures } from "../../assets";
import lightTheme from "../../themes/lightTheme";
import RouterLink from "../core/RouterLink";
import FollowButton from "./FollowButton";
import Card from "../containers/Card";

const Wrapper = styled(Card).attrs({
  $horizontal: true,
  $center: true,
  $gap: "1em",
})`
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

const UserItem = ({ user }: { user: User }) => {
  return (
    <Wrapper>
      <Box $horizontal $center $gap="1em">
        <ProfilePicture
          src={user.profilePicture || pictures.emptyProfilePicture}
        />

        <Box>
          <RouterLink $size="small" $bold to={`/users/${user.id}`}>
            {user.fullName || "TwitturIn User"}
          </RouterLink>

          <RouterLink
            $size="extraSmall"
            $color={lightTheme.colors.grey2}
            to={`/users/${user.id}`}
          >
            @{user.username}
          </RouterLink>
        </Box>
      </Box>

      <FollowButton user={user} />
    </Wrapper>
  );
};

export default UserItem;
