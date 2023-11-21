import styled from "styled-components";
import Box from "../../containers/Box";
import HiddenItems from "./HiddenItems";

const MenuBox = styled(Box)`
  &:hover ${HiddenItems} {
    display: block;
  }
`;

const Menu = ({ children }: { children: React.ReactNode }) => {
  return (
    <MenuBox $gap="0.5em">
      {children}
    </MenuBox>
  );
};

export default Menu;
