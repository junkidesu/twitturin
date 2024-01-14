import styled from "styled-components";
import Box from "./containers/Box";
import Accordion from "./containers/Accordion";
import FlatButton from "./core/buttons/FlatButton";
import { icons } from "../assets";
import Button from "./core/buttons/Button";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/store";
import SideBar from "./containers/SideBar";
import { useGetUserQuery } from "../services/usersService";
import LoadingUserItem from "./util/LoadingUserItem";
import LoginSuggestion from "./util/LoginSuggestion";
import UserItem from "./users/UserItem";
import Link from "./core/Link";
import { useGetLatestReleaseQuery } from "../services/githubService";
import Label from "./core/text/Label";
import QRCode from "react-qr-code";
import RouterLink from "./core/RouterLink";
import useModal from "../hooks/useModal";

const NavButton = styled(FlatButton)`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  padding: 0.9em 1em;
`;

const LatestRelease = () => {
  const navigate = useNavigate();
  const { data: release, isLoading } = useGetLatestReleaseQuery(undefined);

  if (isLoading)
    return (
      <Box>
        <Label>Loading...</Label>
      </Box>
    );

  const onLinkClick = () => {
    navigate("/release");
  };

  return (
    <Box $center $gap="1em">
      <QRCode
        value={release!.assets[0].browser_download_url}
        style={{ width: "150px", height: "150px" }}
      />
      <Link
        href={release!.assets[0].browser_download_url}
        onClick={onLinkClick}
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
        icon={<icons.UserIcon />}
        label="Profile"
        onClick={() => navigate(`/users/${id}`)}
      />
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
  const { showModal } = useModal();

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

        <Button $width="100%" $bg="white" onClick={() => showModal()}>
          Tweet
        </Button>

        <Accordion
          heading={<RouterLink to="/release">Latest Release</RouterLink>}
        >
          <LatestRelease />
        </Accordion>
      </Box>

      <CurrentUserItem />
    </CustomSideBar>
  );
};

export default NavSideBar;
