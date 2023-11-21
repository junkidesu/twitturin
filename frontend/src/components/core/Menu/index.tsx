import styled from "styled-components";
import Box from "../../containers/Box";
import HiddenItems from "./HiddenItems";

const MenuBox = styled(Box)`
  display: block;

  &:hover ${HiddenItems} {
    display: block;
  }
`;

const Menu = ({ children }: { children: React.ReactNode }) => {
  return (
    <MenuBox $pad="s" $gap="0.5em">
      {children}
    </MenuBox>
  );
};

export default Menu;
