import styled from "styled-components";
import VerticalList from "../lists/VerticalList";
import RouterLink from "../core/RouterLink";
import AuthButton from "./AuthButton";
import lightTheme from "../../themes/lightTheme";
import { useAppDispatch } from "../../hooks/store";
import { removeCredentials } from "../../reducers/authReducer";

const OtherItems = styled(VerticalList)`
  display: none;
`;

const MenuButton = styled.button<{ $active?: boolean }>`
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

const ProfileMenuWrapper = styled(VerticalList)`
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

const ProfileMenu = ({
  username,
  setVisible,
}: {
  username: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
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
        <MenuButton onClick={() => setVisible(true)}>New Tweet</MenuButton>
        <MenuButton>Edit profile</MenuButton>
        <MenuButton onClick={handleSignOut}>Sign out</MenuButton>
      </OtherItems>
    </ProfileMenuWrapper>
  );
};

export default ProfileMenu;
