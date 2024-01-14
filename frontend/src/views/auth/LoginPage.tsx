import useField from "../../hooks/useField";
import Button from "../../components/core/buttons/Button";
import Input from "../../components/core/inputs/Input";
import { useNavigate } from "react-router-dom";
import { Credentials } from "../../types";
import Box from "../../components/containers/Box";
import Form from "../../components/core/Form";
import Label from "../../components/core/text/Label";
import RouterLink from "../../components/core/RouterLink";
import styled from "styled-components";
import PageHeading from "../../components/util/PageHeading";
import Card from "../../components/containers/Card";
import useLoadingStripe from "../../hooks/useLoadingStripe";
import useAlert from "../../hooks/useAlert";
import useAuthentication from "../../hooks/useAuthentication";

const LoginForm = styled(Form)`
  padding: 1em;
`;

const LoginPage = () => {
  const [, username] = useField("text", "Username");
  const [, password] = useField("password", "Password");
  const { showLoadingStripe, hideLoadingStripe } = useLoadingStripe();
  const { errorAlert } = useAlert();
  const { authenticate, isLoading } = useAuthentication();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const credentials: Credentials = {
      username: username.value,
      password: password.value,
    };

    showLoadingStripe();

    try {
      await authenticate(credentials);
      navigate("/");
    } catch (error) {
      errorAlert(error);
    }

    hideLoadingStripe();
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
        <Input {...username} required id="username" />

        <Input {...password} required id="password" />

        <Button $width="100%" disabled={isLoading} id="login-button">
          Log In
        </Button>
      </LoginForm>
    </Box>
  );
};

export default LoginPage;
