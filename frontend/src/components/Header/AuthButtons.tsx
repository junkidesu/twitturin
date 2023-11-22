import { useNavigate } from "react-router-dom";
import Box from "../containers/Box";
import HeaderButton from "./HeaderButton";

const AuthButtons = () => {
  const navigate = useNavigate();

  return (
    <Box $horizontal $center $gap="0.5em">
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
    </Box>
  );
};

export default AuthButtons;
