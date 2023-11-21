import styled from "styled-components";
import VBox from "./containers/VBox";
import useField from "../hooks/useField";
import Button from "./core/Button";
import Input from "./core/Input";
import Form from "./core/Form";
import Modal from "./containers/Modal";
import LoadingSpinner from "./LoadingSpinner";
import { useAppDispatch } from "../hooks/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLoginMutation } from "../services/authService";
import { TokenData } from "../types";
import { setCredentials } from "../reducers/authReducer";
import { hideModal, showModal } from "../reducers/modalReducer";

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
    <VBox $gap="2em" $center>
      <Modal>
        <LoadingSpinner label="Logging in..." />
      </Modal>

      <LogoText>Log in to Twittur</LogoText>

      <Form onSubmit={handleLogin}>
        <Input {...username} required />

        <Input {...password} required />

        <Button $rounded>Log in</Button>
      </Form>
    </VBox>
  );
};

export default LoginForm;
