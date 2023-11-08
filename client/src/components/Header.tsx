import styled from "styled-components";
import Link from "./Link";
import RouterLink from "./RouterLink";
import HorizontalContainer from "./HorizontalContainer";

const NavLink = styled(Link)`
  color: #eeeeee;
  transition: 0.3s;

  &:hover {
    text-decoration: none;
    color: #eeeeee;
    transition: 0.3s;
  }
`;

const AuthLink = styled(NavLink)`
  font-size: 1.3em;
  padding: 0.5em;
  border: 2px solid #eeeeee;
  border-radius: 5px;

  &:hover {
    background-color: #eeeeee;
    color: slategray;
  }
`;

const AuthLinks = styled(HorizontalContainer)`
  position: absolute;
  right: 1em;
`;

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #40e0d0bb, #008080bb, #708090bb);
  padding: 1em;
  margin-bottom: 0.5em;
`;

const LogoText = styled(NavLink)`
  font-weight: bold;
  font-size: 2em;

  &:hover {
    text-shadow: 5px 5px 10px turquoise;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoText>Twittur</LogoText>

      <AuthLinks gap="1em">
        <RouterLink to="/login">
          <AuthLink>Sign in</AuthLink>
        </RouterLink>
        <RouterLink to="/">
          <AuthLink>Sign up</AuthLink>
        </RouterLink>
      </AuthLinks>
    </HeaderContainer>
  );
};

export default Header;
