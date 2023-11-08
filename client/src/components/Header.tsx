import styled from "styled-components";
import Link from "./Link";

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

const LogoText = styled(Link)`
  color: #eeeeee;
  margin: 0;
  font-weight: bold;
  font-size: 2em;
  transition: 0.3s;

  &:hover {
    text-decoration: none;
    color: #eeeeee;
    text-shadow: 5px 5px 10px turquoise;
    transition: 0.3s;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoText>Twitturin</LogoText>
    </HeaderContainer>
  );
};

export default Header;
