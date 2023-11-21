import useField from "../hooks/useField";
import Button from "./core/Button";
import Input from "./core/Input";
import Form from "./core/Form";
import Modal from "./containers/Modal";
import LoadingSpinner from "./LoadingSpinner";
import lightTheme from "../themes/lightTheme";
import { useAppDispatch } from "../hooks/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLoginMutation } from "../services/authService";
import { TokenData } from "../types";
import { setCredentials } from "../reducers/authReducer";
import { hideModal, showModal } from "../reducers/modalReducer";
import Heading from "./core/Heading";
import Box from "./containers/Box";

const LoginForm = () => {
  const username = useField("text", "Username");
  const password = useField("password", "Password");

  const [login, { data: tokenData, isLoading, isError, isSuccess }] =
    useLoginMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // if the login mutation is loading, show the modal which contains the loading spinner
  useEffect(() => {
    if (isLoading) dispatch(showModal());
  }, [isLoading, dispatch]);

  // if the query is successful, hide the modal and go to the main page
  useEffect(() => {
    if (isSuccess) {
      dispatch(hideModal());
      navigate("/");
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
    <Box $gap="2em" $center>
      <Modal>
        <LoadingSpinner label="Logging in..." />
      </Modal>

      <Heading $level={2} $color={lightTheme.colors.primary}>
        Log in to Twittur
      </Heading>

      <Form onSubmit={handleLogin}>
        <Input {...username} required />

        <Input {...password} required />

        <Button $rounded>Log in</Button>
      </Form>
    </Box>
  );
};

export default LoginForm;
