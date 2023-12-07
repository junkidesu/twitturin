import styled from "styled-components";
import Box from "./containers/Box";
import FlatButton from "./core/buttons/FlatButton";
import { icons, pictures } from "../assets";
import lightTheme from "../themes/lightTheme";
import Button from "./core/buttons/Button";
import Label from "./core/text/Label";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { showModal } from "../reducers/modalReducer";
import SideBar from "./containers/SideBar";

const NavButton = styled(FlatButton)`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  padding: 0.7em 1em;
`;

const ProfileWrapper = styled(Box)`
  justify-content: space-between;
  cursor: pointer;
`;

const ProfilePicture = styled.img`
  width: 2.5em;
  height: 2.5em;
  box-sizing: border-box;
  border-radius: 10em;
`;

const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
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
  );
};

const UserDetails = () => {
  const username = useAppSelector(({ auth }) => auth?.username);

  return (
    <ProfileWrapper $horizontal $pad="m" $center $rounded>
      <Box $horizontal $gap="1em">
        <ProfilePicture src={pictures.emptyProfilePicture} />

        <Box $gap="0.5em">
          <Label $bold $size="small">
            {"Twittur user"}
          </Label>
          <Label $color={lightTheme.colors.grey2} $size="small">
            @{username}
          </Label>
        </Box>
      </Box>

      <icons.MoreHorizontalIcon />
    </ProfileWrapper>
  );
};

const NavSideBar = () => {
  const dispatch = useAppDispatch();

  return (
    <SideBar $width="300px" $pad="s" $bg="white">
      <Box $gap="0.5em">
        <NavigationButtons />
        <Button $width="100%" $bg="white" onClick={() => dispatch(showModal())}>
          Tweet
        </Button>
      </Box>

      <UserDetails />
    </SideBar>
  );
};

export default NavSideBar;
