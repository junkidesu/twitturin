import styled from "styled-components";
import RouterLink from "../core/RouterLink";
import HBox from "../containers/HBox";
import AuthButton from "./AuthButton";
import lightTheme from "../../themes/lightTheme";
import ProfileMenu from "./ProfileMenu";
import { useAppSelector } from "../../hooks/store";
import Box from "../containers/Box";

const RightCorner = styled(HBox)`
  position: absolute;
  top: 0.7em;
  right: 1em;
`;

const HeaderBox = styled(Box)`
  position: sticky;
  top: 0;
  backdrop-filter: blur(2px);
  padding-left: 2em;
  margin-bottom: 0.5em;
  z-index: 100;
`;

const HomePageLink = styled(RouterLink)`
  color: #eeeeee;
  transition: 0.3s;
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.large};

  &:hover {
    color: #eeeeee;
    text-shadow: 5px 5px 10px ${(props) => props.theme.colors.secondary};
  }
`;

const Header = () => {
  const username = useAppSelector(({ auth }) => auth.username);

  return (
    <HeaderBox $horizontal $pad="l" $bg="#222222bb">
      <HomePageLink to="/">Twittur</HomePageLink>

      {username ? (
        <ProfileMenu username={username} />
      ) : (
        <RightCorner $gap="1em">
          <RouterLink to="/login">
            <AuthButton $fg={lightTheme.colors.background} $bg="transparent">
              Sign in
            </AuthButton>
          </RouterLink>
          <RouterLink to="sign-up/">
            <AuthButton $fg={lightTheme.colors.background} $bg="transparent">
              Sign up
            </AuthButton>
          </RouterLink>
        </RightCorner>
      )}
    </HeaderBox>
  );
};

export default Header;
