import useField from "../../hooks/useField";
import Button from "../../components/core/buttons/Button";
import Input from "../../components/core/inputs/Input";
import { useAppDispatch } from "../../hooks/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLoginMutation } from "../../services/authService";
import { TokenData } from "../../types";
import { setCredentials } from "../../reducers/authReducer";
import Box from "../../components/containers/Box";
import Form from "../../components/core/Form";
import Label from "../../components/core/text/Label";
import RouterLink from "../../components/core/RouterLink";
import styled from "styled-components";
import PageHeading from "../../components/util/PageHeading";
import Card from "../../components/containers/Card";
import useLoadingStripe from "../../hooks/useLoadingStripe";
import useAlert from "../../hooks/useAlert";
import storageService from "../../services/storageService";

const LoginForm = styled(Form)`
  padding: 1em;
`;

const LoginPage = () => {
  const [, username] = useField("text", "Username");
  const [, password] = useField("password", "Password");
  const { showLoadingStripe, hideLoadingStripe } = useLoadingStripe();
  const alertUser = useAlert();

  const [login, { data: tokenData, isLoading, isSuccess }] = useLoginMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) showLoadingStripe();
  }, [isLoading, showLoadingStripe]);

  useEffect(() => {
    if (isSuccess) {
      hideLoadingStripe();
      navigate(-1);
    }
  }, [navigate, hideLoadingStripe, isSuccess, tokenData]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const tokenData: TokenData = await login({
        username: username.value,
        password: password.value,
      }).unwrap();

      dispatch(setCredentials(tokenData));
      storageService.setAuthUser(tokenData);
    } catch (error) {
      hideLoadingStripe();
      if (error && typeof error === "object") {
        if ("data" in error) {
          if (
            error.data &&
            typeof error.data === "object" &&
            "error" in error.data
          ) {
            const errorMessage: string =
              "error" in error.data
                ? (error.data.error as string)
                : "Some error has occured! (Check the logs)";

            alertUser(errorMessage);
          }
        }
      }
    }
  };

  return (
    <Box $gap="0.1em" $width="500px">
      <PageHeading label="Login to Twittur" />

      <Card>
        <Label>
          Not a member yet? <RouterLink to="/sign-up">Join now!</RouterLink>
        </Label>
      </Card>

      <LoginForm onSubmit={handleLogin}>
        <Input {...username} required />

        <Input {...password} required />

        <Button $width="100%" disabled={isLoading}>
          Log in
        </Button>
      </LoginForm>
    </Box>
  );
};

export default LoginPage;
