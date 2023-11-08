import styled from "styled-components";
import VerticalContainer from "./containers/VerticalContainer";
import useField from "../hooks/useField";
import Button from "./core/Button";
import Input from "./core/Input";

const LogoText = styled.p`
  color: teal;
  margin: 0;
  font-weight: bold;
  font-size: 2em;
  transition: 0.3s;
`;

const LoginWrapper = styled(VerticalContainer)`
  justify-content: center;
  padding: 1em;
  border-radius: 15px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #eeeeee;
  height: 500px;
  width: 500px;
`;

const LoginForm = () => {
  const studentId = useField("text");
  const password = useField("password");

  return (
    <LoginWrapper gap="2em" $center>
      <LogoText>Log in to Twittur</LogoText>

      <form onSubmit={(e) => e.preventDefault()}>
        <VerticalContainer gap="1em">
          <Input placeholder="Student ID" {...studentId} />

          <Input placeholder="Password" {...password} />

          <Button $bg="white" $fg="teal" $rounded>
            Log in
          </Button>
        </VerticalContainer>
      </form>
    </LoginWrapper>
  );
};

export default LoginForm;
