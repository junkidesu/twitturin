import useField from "../../hooks/useField";
import Button from "../core/buttons/Button";
import Input from "../core/inputs/Input";
import { useAppDispatch } from "../../hooks/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLoginMutation } from "../../services/authService";
import { TokenData } from "../../types";
import { setCredentials } from "../../reducers/authReducer";
import { show, hide } from "../../reducers/loadingStripeReducer";
import Heading from "../core/text/Heading";
import Box from "../containers/Box";
import Form from "../core/Form";

const LoginHeading = () => {
  return (
    <Box $bg="white" $pad="l">
      <Heading $level={2}>Log in to Twittur</Heading>
    </Box>
  );
};

const LoginForm = () => {
  const [, username] = useField("text", "Username");
  const [, password] = useField("password", "Password");

  const [login, { data: tokenData, isLoading, isError, isSuccess }] =
    useLoginMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) dispatch(show());
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(hide());
      navigate(-1);
    }
  }, [navigate, dispatch, isSuccess, tokenData]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const tokenData: TokenData = await login({
      username: username.value,
      password: password.value,
    }).unwrap();

    dispatch(setCredentials(tokenData));
  };

  if (isError) return <div>Error occured! [TODO error message screen]</div>;

  return (
    <Box $gap="0.1em" $width="500px">
      <LoginHeading />

      <Form onSubmit={handleLogin}>
        <Input {...username} required />

        <Input {...password} required />

        <Button $width="100%">Log in</Button>
      </Form>
    </Box>
  );
};

export default LoginForm;
