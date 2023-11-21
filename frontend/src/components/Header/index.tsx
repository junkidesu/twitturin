import styled from "styled-components";
import RouterLink from "../core/RouterLink";
import Box from "../containers/Box";

const RightCornerBox = styled(Box)`
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
  // const username = useAppSelector(({ auth }) => auth.username);

  return (
    <HeaderBox $horizontal $pad="l" $bg="#222222bb">
      <HomePageLink to="/">Twittur</HomePageLink>

      <RightCornerBox>Soon there will be a component</RightCornerBox>
    </HeaderBox>
  );
};

export default Header;
