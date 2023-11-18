import styled from "styled-components";
import RouterLink from "../core/RouterLink";
import HorizontalList from "../lists/HorizontalList";
import AuthButton from "./AuthButton";
import lightTheme from "../../themes/lightTheme";
import ProfileMenu from "./ProfileMenu";
import { useAppSelector } from "../../hooks/store";

const RightCorner = styled(HorizontalList)`
  position: absolute;
  top: 0.7em;
  right: 1em;
`;

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: linear-gradient(45deg, #40e0d0bb, #008080bb, #708090bb);
  padding: 1em;
  margin-bottom: 0.5em;
  z-index: 100;
`;

const LogoText = styled.div`
  color: ${(props) => props.theme.colors.background};
  transition: 0.3s;
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.large};

  &:hover {
    text-shadow: 5px 5px 10px ${(props) => props.theme.colors.secondary};
  }
`;

const Header = () => {
  const username = useAppSelector(({ auth }) => auth.tokenData?.username);

  return (
    <HeaderContainer>
      <RouterLink to="/">
        <LogoText>Twittur</LogoText>
      </RouterLink>

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
    </HeaderContainer>
  );
};

export default Header;
