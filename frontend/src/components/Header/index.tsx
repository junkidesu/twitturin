import styled from "styled-components";
import RouterLink from "../core/RouterLink";
import Box from "../containers/Box";
import ProfileMenu from "./ProfileMenu";
import { useAppSelector } from "../../hooks/store";
import AuthButtons from "./AuthButtons";

const RightCornerBox = styled(Box)`
  position: absolute;
  align-items: center;
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

  @media (max-width: 650px) {
    align-items: center;
    justify-content: center;
  }
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
  const { username, id } = useAppSelector(({ auth }) => auth);

  return (
    <HeaderBox $horizontal $pad="l" $bg="#222222bb">
      <HomePageLink to="/">Twittur</HomePageLink>

      <RightCornerBox>
        {username ? <ProfileMenu username={username!} id={id!} /> : <AuthButtons />}
      </RightCornerBox>
    </HeaderBox>
  );
};

export default Header;
