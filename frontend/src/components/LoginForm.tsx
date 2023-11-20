import styled from "styled-components";
import VStack from "./containers/VStack";
import useField from "../hooks/useField";
import Button from "./core/Button";
import Input from "./core/Input";
import Form from "./core/Form";
import { useAppDispatch } from "../hooks/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLoginMutation } from "../services/authService";
import { TokenData } from "../types";
import { setCredentials } from "../reducers/authReducer";

const LogoText = styled.p`
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
  font-weight: bold;
  font-size: 2em;
  transition: 0.3s;
`;

const LoginForm = () => {
  const username = useField("text", "Username");
  const password = useField("password", "Password");

  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [navigate, isSuccess]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const tokenData: TokenData = await login({
      username: username.value,
      password: password.value,
    }).unwrap();

    dispatch(setCredentials(tokenData));
  };

  if (isLoading) return <div>Loading...[TODO loading spinner]</div>;

  if (isError) return <div>Error occured! [TODO error message screen]</div>;

  return (
    <VStack $gap="2em" $center>
      <LogoText>Log in to Twittur</LogoText>

      <Form onSubmit={onSubmit}>
        <Input {...username} required />

        <Input {...password} required />

        <Button $rounded>Log in</Button>
      </Form>
    </VStack>
  );
};

export default LoginForm;
