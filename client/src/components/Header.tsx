import styled from "styled-components";

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, turquoise, teal, slategrey);
  padding: 1em;
  margin-bottom: 0.5em;
`;

const LogoText = styled.p`
  color: #eeeeee;
  margin: 0;
  font-weight: bold;
  font-size: 2em;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoText>Twitturin</LogoText>
    </HeaderContainer>
  );
};

export default Header;