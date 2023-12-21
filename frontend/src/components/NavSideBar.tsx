import styled from "styled-components";
import Box from "./containers/Box";
import FlatButton from "./core/buttons/FlatButton";
import { icons, pictures } from "../assets";
import Button from "./core/buttons/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { showModal } from "../reducers/modalReducer";
import SideBar from "./containers/SideBar";
import { useGetUserQuery } from "../services/usersService";
import LoadingUserItem from "./util/LoadingUserItem";
import LoginSuggestion from "./util/LoginSuggestion";
import UserItem from "./users/UserItem";
import Link from "./core/Link";

const NavButton = styled(FlatButton)`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  padding: 0.9em 1em;
`;

const QRCode = styled.img.attrs({ src: pictures.appQRCode })`
  width: 200px;
  height: 200px;
`;

const AndroidQRCode = () => {
  return (
    <Box>
      <QRCode />
      <Link
        href={
          "https://github.com/luminous-or-me/twitturin-android/raw/main/app-debug.apk"
        }
      >
        Get Android App Now!
      </Link>
    </Box>
  );
};

const NavigationButtons = () => {
  const id = useAppSelector(({ auth }) => auth.id);
  const navigate = useNavigate();

  return (
    <Box $center>
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
        icon={<icons.UserIcon />}
        label="Profile"
        onClick={() => navigate(`/users/${id}`)}
      />

      <AndroidQRCode />
    </Box>
  );
};

const CurrentUserItem = () => {
  const id = useAppSelector(({ auth }) => auth!.id);
  const { data: user, isLoading, isError } = useGetUserQuery(id!);

  if (isLoading) return <LoadingUserItem />;

  if (!user || isError) return <div>Some error occurred!</div>;

  return <UserItem user={user} />;
};

const CustomSideBar = styled(SideBar)`
  @media (max-width: 800px) {
    display: none;
  }
`;

const NavSideBar = () => {
  const id = useAppSelector(({ auth }) => auth.id);
  const dispatch = useAppDispatch();

  if (!id)
    return (
      <CustomSideBar>
        <LoginSuggestion />
      </CustomSideBar>
    );
  return (
    <CustomSideBar $width="300px" $pad="s" $bg="white">
      <Box $gap="0.5em">
        <NavigationButtons />

        <Button $width="100%" $bg="white" onClick={() => dispatch(showModal())}>
          Tweet
        </Button>
      </Box>

      <CurrentUserItem />
    </CustomSideBar>
  );
};

export default NavSideBar;
