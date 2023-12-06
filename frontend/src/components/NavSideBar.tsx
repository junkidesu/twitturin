import styled from "styled-components";
import Box from "./containers/Box";
import FlatButton from "./core/buttons/FlatButton";
import { icons, pictures } from "../assets";
import lightTheme from "../themes/lightTheme";
import Button from "./core/buttons/Button";
import Label from "./core/text/Label";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/store";
import { showModal } from "../reducers/modalReducer";

const AsideWrapper = styled(Box)`
  justify-content: space-between;
  position: sticky;
  top: 4.8em;
  height: 90vh;
  overflow-y: auto;
`;

const NavButton = styled(FlatButton)`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  padding: 0.7em 1em;
`;

const ProfileWrapper = styled(Box)`
  border-radius: 0.5em;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProfilePicture = styled.img`
  width: 2.5em;
  height: 2.5em;
  box-sizing: border-box;
  border-radius: 10em;
  cursor: pointer;
`;

const NavSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <AsideWrapper $width="300px" $pad="s" $bg="white">
      <Box $gap="0.5em">
        <Box>
          <NavButton
            icon={<icons.HomeIcon />}
            label="Home"
            onClick={() => navigate("/")}
          />
          <NavButton
            icon={<icons.SearchIcon />}
            label="Explore"
            onClick={() => navigate("/explore")}
          />
          <NavButton
            icon={<icons.MailIcon />}
            label="Messages"
            onClick={() => navigate("/messages")}
          />
          <NavButton
            icon={<icons.BellIcon />}
            label="Notifications"
            onClick={() => navigate("/notifications")}
          />
          <NavButton
            icon={<icons.UsersIcon />}
            label="Communities"
            onClick={() => navigate("/communities")}
          />
          <NavButton
            icon={<icons.UserIcon />}
            label="Profile"
            onClick={() => navigate("/me")}
          />
        </Box>

        <Button $width="100%" $bg="white" onClick={() => dispatch(showModal())}>
          Tweet
        </Button>
      </Box>

      <ProfileWrapper $horizontal $pad="m" $center $rounded>
        <Box $horizontal $gap="1em">
          <ProfilePicture src={pictures.emptyProfilePicture} />

          <Box $gap="0.5em">
            <Label $bold>{"Twittur user"}</Label>
            <Label $color={lightTheme.colors.grey2}>@{"loading..."}</Label>
          </Box>
        </Box>

        <icons.MoreHorizontalIcon />
      </ProfileWrapper>
    </AsideWrapper>
  );
};

export default NavSideBar;
