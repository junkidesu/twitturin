import styled from "styled-components";
import Box from "../containers/Box";
import { User } from "../../types";
import Label from "../core/text/Label";
import { icons, pictures } from "../../assets";
import lightTheme from "../../themes/lightTheme";
import IconButton from "../core/buttons/IconButton";
import { useNavigate } from "react-router-dom";

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

const UserItem = ({ user }: Props) => {
  const navigate = useNavigate();

  return (
    <Wrapper
      $horizontal
      $center
      $gap="1em"
      $width="100%"
      $pad="m"
      onClick={() => navigate(`/users/${user.id}`)}
    >
      <Box $horizontal $center $gap="1em">
        <ProfilePicture src={pictures.emptyProfilePicture} />

        <DetailsWrapper>
          <Label $size="small" $bold>
            {user.fullName || "TwitturIn User"}
          </Label>

          <Label $size="extraSmall" $color={lightTheme.colors.grey2}>
            @{user.username}
          </Label>
        </DetailsWrapper>
      </Box>

      <IconButton icon={<icons.UserPlusIcon />} label="follow" />
    </Wrapper>
  );
};

export default UserItem;
