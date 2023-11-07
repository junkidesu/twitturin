import styled from "styled-components";
import GlobalStyle from "./theme";

const Header = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, turquoise, teal, slategrey);
  padding: 1em;
`;

const LogoText = styled.p`
  color: #eeeeee;
  margin: 0;
  font-weight: bold;
  font-size: 2em;
`;

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Header>
        <LogoText>Twitturin</LogoText>
      </Header>
    </div>
  );
};

export default App;
