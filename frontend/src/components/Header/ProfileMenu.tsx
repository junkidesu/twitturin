import styled from "styled-components";
import VStack from "../containers/VStack";
import RouterLink from "../core/RouterLink";
import AuthButton from "./AuthButton";
import lightTheme from "../../themes/lightTheme";
import { useAppDispatch } from "../../hooks/store";
import { removeCredentials } from "../../reducers/authReducer";
import { showModal } from "../../reducers/modalReducer";
import Icon from "../core/Icon";
import { icons } from "../../assets";
import storageService from "../../services/storageService";

const OtherItems = styled(VStack)`
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

  &:hover {
    background-color: ${(props) => props.theme.colors.grey4};
    transition: 0.2s;
  }
`;

const ProfileMenuWrapper = styled(VStack)`
  position: absolute;
  top: 0.7em;
  right: 1em;
  gap: 0.5em;

  &:hover ${OtherItems} {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const ProfileMenu = ({ username }: { username: string }) => {
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    storageService.removeAuthUser();
    dispatch(removeCredentials());
  };

  return (
    <ProfileMenuWrapper $center>
      <RouterLink to="/me">
        <AuthButton $fg={lightTheme.colors.background} $bg="transparent">
          {username}
        </AuthButton>
      </RouterLink>

      <OtherItems>
        <MenuButton onClick={() => dispatch(showModal())}>
          <Icon src={icons.createIcon} /> New Tweet
        </MenuButton>
        <MenuButton>
          <Icon src={icons.editIcon} /> Edit profile
        </MenuButton>
        <MenuButton onClick={handleSignOut}>
          <Icon src={icons.logOutIcon} /> Sign out
        </MenuButton>
      </OtherItems>
    </ProfileMenuWrapper>
  );
};

export default ProfileMenu;
