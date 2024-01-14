import styled from "styled-components";
import Box from "../containers/Box";
import { User } from "../../types";
import { pictures } from "../../assets";
import lightTheme from "../../themes/lightTheme";
import RouterLink from "../core/RouterLink";
import FollowButton from "./FollowButton";
import Card from "../containers/Card";
import { useNavigate } from "react-router-dom";

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

const ProfileLink = styled(RouterLink)`
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserItem = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Box $horizontal $center $gap="1em">
        <ProfilePicture
          src={user.profilePicture || pictures.emptyProfilePicture}
          onClick={() => navigate(`/users/${user.id}`)}
        />

        <Box>
          <ProfileLink $size="small" $bold to={`/users/${user.id}`}>
            {user.fullName || "TwitturIn User"}
          </ProfileLink>

          <ProfileLink
            $size="extraSmall"
            $color={lightTheme.colors.grey2}
            to={`/users/${user.id}`}
          >
            @{user.username}
          </ProfileLink>
        </Box>
      </Box>

      <FollowButton user={user} />
    </Wrapper>
  );
};

export default UserItem;
