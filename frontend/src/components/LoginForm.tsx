import styled from "styled-components";
import VerticalContainer from "./containers/VerticalContainer";
import useField from "../hooks/useField";
import Button from "./core/Button";
import Input from "./core/Input";
import { authenticate } from "../reducers/authReducer";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LogoText = styled.p`
  color: ${(props) => props.theme.colors.primary};
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
  background-color: ${(props) => props.theme.colors.background};
  height: 500px;
  width: 500px;
`;

const LoginForm = () => {
  const username = useField("text", "Username");
  const password = useField("password", "Password");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tokenData = useAppSelector(({ auth }) => auth.tokenData);

  useEffect(() => {
    if (tokenData) navigate("/");
  }, [navigate, tokenData]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      authenticate({ username: username.value, password: password.value })
    );
  };

  return (
    <LoginWrapper gap="2em" $center>
      <LogoText>Log in to Twittur</LogoText>

      <form onSubmit={onSubmit}>
        <VerticalContainer gap="1em">
          <Input {...username} required />

          <Input {...password} required />

          <Button $rounded>Log in</Button>
        </VerticalContainer>
      </form>
    </LoginWrapper>
  );
};

export default LoginForm;
