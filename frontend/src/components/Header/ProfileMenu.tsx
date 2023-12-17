import storageService from "../../services/storageService";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/store";
import { removeCredentials } from "../../reducers/authReducer";
import { icons } from "../../assets";
import Menu from "../core/Menu";
import VisibleItems from "../core/Menu/VisibleItems";
import HiddenItems from "../core/Menu/HiddenItems";
import FlatButton from "../core/buttons/FlatButton";
import { useState } from "react";
import styled from "styled-components";
import IconButton from "../core/buttons/IconButton";

const MenuButton = styled(IconButton).attrs({ icon: <icons.MenuIcon /> })`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  color: white;
  border: 3px solid white;
  border-radius: 10px;
`;

const ProfileMenu = ({ id }: { username: string; id: string }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    storageService.removeAuthUser();

    dispatch(removeCredentials());
  };

  return (
    <Menu>
      <VisibleItems>
        <MenuButton onClick={() => setVisible(!visible)} />
      </VisibleItems>

      {visible && (
        <HiddenItems>
          <FlatButton
            icon={<icons.UserIcon />}
            label="Profile"
            onClick={() => navigate(`/users/${id}`)}
          />
          <FlatButton
            icon={<icons.EditIcon />}
            label="Edit profile"
            onClick={() => navigate("/edit-profile")}
          />
          <FlatButton
            icon={<icons.LogOutIcon />}
            onClick={handleSignOut}
            label="Log out"
          />
        </HiddenItems>
      )}
    </Menu>
  );
};

export default ProfileMenu;
