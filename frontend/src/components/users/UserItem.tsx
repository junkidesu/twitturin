import styled from "styled-components";
import Box from "../containers/Box";
import { User } from "../../types";
import Label from "../core/text/Label";
import { pictures } from "../../assets";
import lightTheme from "../../themes/lightTheme";
import RouterLink from "../core/RouterLink";
import FollowButton from "./FollowButton";

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

const UserItem = ({ user }: { user: User }) => {
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
