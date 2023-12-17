import styled from "styled-components";
import Box from "../containers/Box";
import Button from "../core/buttons/Button";
import Heading from "../core/text/Heading";
import Label from "../core/text/Label";
import { useNavigate } from "react-router-dom";

const Wrapper = styled(Box)`
  height: 100%;
  /* align-items: center; */
  justify-content: center;
`;

const LoginSuggestion = () => {
  const navigate = useNavigate();

  return (
    <Wrapper $pad="l" $bg="white" $width="300px" $gap="1em">
      <Heading $level={2}>You aren't logged in!</Heading>

      <Label>And Twittur just isn't the same without you.</Label>

      <Button $width="100%" onClick={() => navigate("/login")}>
        Log in
      </Button>
    </Wrapper>
  );
};

export default LoginSuggestion;
