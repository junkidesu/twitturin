import styled from "styled-components";
import AuthButton from "./AuthButton";
import lightTheme from "../../themes/lightTheme";
import { icons } from "../../assets";
import Box from "../containers/Box";
import IconButton from "../core/buttons/IconButton";

const OtherItems = styled(Box)`
  display: none;
`;

const MenuButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5em;
  color: ${(props) =>
    props.$active ? props.theme.colors.primary : props.theme.colors.grey2};
  padding: 0.7em;
  font-size: ${(props) => props.theme.fontSizes.small};
  background-color: ${(props) =>
    props.$active ? props.theme.colors.grey4 : "white"};
  border: none;
  border-radius: ${(props) => (props.$active ? "10px" : "0")};
  transition: 0.2s;
  min-width: fit-content;

  &:hover {
    background-color: ${(props) => props.theme.colors.grey4};
    transition: 0.2s;
  }
`;

const MenuItem = ({ children }: { children: React.ReactNode }) => (
  <Box $center>{children}</Box>
);

const MenuBox = styled(Box)`
  position: absolute;
  top: 0.7em;
  right: 1em;

  &:hover ${OtherItems} {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const Menu = ({ username }: { username: string }) => {

  return (
    <MenuBox $center>
      <MenuItem>
        <AuthButton $fg={lightTheme.colors.background} $bg="transparent">
          {username}
        </AuthButton>
      </MenuItem>

      <OtherItems>
        <IconButton icon={<icons.BookmarkIcon />} label="save" />
      </OtherItems>
    </MenuBox>
  );
};

export default Menu;
