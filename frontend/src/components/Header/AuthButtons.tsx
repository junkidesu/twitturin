import { useNavigate } from "react-router-dom";
import Box from "../containers/Box";
import HeaderButton from "./HeaderButton";
import styled from "styled-components";
import { icons } from "../../assets";
import IconButton from "../core/buttons/IconButton";
import Menu from "../core/Menu";
import HiddenItems from "../core/Menu/HiddenItems";
import VisibleItems from "../core/Menu/VisibleItems";
import FlatButton from "../core/buttons/FlatButton";
import { useState } from "react";

const MenuButton = styled(IconButton).attrs({ icon: <icons.MenuIcon /> })`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  color: white;
  border: 3px solid white;
  border-radius: 10px;
`;

const Wrapper = styled(Box)`
  @media (min-width: 650px) {
    ${MenuButton} {
      display: none;
    }
  }
  @media (max-width: 650px) {
    ${HeaderButton} {
      display: none;
    }
  }
`;

const AuthButtons = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const onLogin = () => {
    setVisible(false);
    navigate("/login");
  };

  const onSignUp = () => {
    setVisible(false);
    navigate("/sign-up");
  };

  return (
    <Wrapper $horizontal $center $gap="0.5em">
      <Menu>
        <VisibleItems>
          <MenuButton onClick={() => setVisible(!visible)} />
        </VisibleItems>

        {visible && (
          <HiddenItems>
            <FlatButton
              icon={<icons.UserCheckIcon />}
              label="Sign in"
              onClick={onLogin}
            />
            <FlatButton
              icon={<icons.UserPlusIcon />}
              label="Sign up"
              onClick={onSignUp}
            />
          </HiddenItems>
        )}
      </Menu>

      <HeaderButton
        $size="small"
        $bg="transparent"
        $fg="#eeeeee"
        onClick={() => navigate("/login")}
      >
        Sign in
      </HeaderButton>
      <HeaderButton
        $size="small"
        $bg="transparent"
        $fg="#eeeeee"
        onClick={() => navigate("/sign-up")}
      >
        Sign up
      </HeaderButton>
    </Wrapper>
  );
};

export default AuthButtons;
