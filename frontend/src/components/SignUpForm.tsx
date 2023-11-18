import styled from "styled-components";
import VerticalContainer from "./containers/VerticalContainer";
import useField from "../hooks/useField";
import Input from "./core/Input";
import Button from "./core/Button";
import { Major } from "../types";
import Select from "./core/Select";

const LogoText = styled.p`
  color: teal;
  margin: 0;
  font-weight: bold;
  font-size: 2em;
  transition: 0.3s;
`;

const SignUpWrapper = styled(VerticalContainer)`
  justify-content: center;
  padding: 1em;
  border-radius: 15px;
  box-sizing: border-box;
  overflow: hidden;
  width: 400px;
`;

const majors = Object.values(Major).map((m) => m.toString());

const SignUpForm = () => {
  const studentId = useField("text", "StudentID");
  const username = useField("text", "Username");
  const password = useField("password", "Password");
  const major = useField(undefined, "Major");
  const email = useField("email", "Email");

  return (
    <SignUpWrapper $center gap="2em">
      <LogoText>Join Twittur today</LogoText>

      <form onSubmit={(e) => e.preventDefault()}>
        <VerticalContainer gap="1em">
          <Input {...studentId} required />
          <Input {...username} required />
          <Select options={majors} {...major} />
          <Input {...password} required />
          <Input {...email} required />

          <Button $rounded>Sign Up</Button>
        </VerticalContainer>
      </form>
    </SignUpWrapper>
  );
};

export default SignUpForm;
