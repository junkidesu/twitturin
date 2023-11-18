import styled from "styled-components";
import VerticalContainer from "./containers/VerticalContainer";
import HorizontalContainer from "./containers/HorizontalContainer";
import useField from "../hooks/useField";
import Input from "./core/Input";
import Button from "./core/Button";
import { Major } from "../types";
import Select from "./core/Select";
import { useState } from "react";

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
  width: 600px;
`;

const ChooseKindButton = styled.button<{ $active: boolean }>`
  width: 100%;
  color: ${(props) =>
    props.$active ? props.theme.colors.primary : props.theme.colors.grey2};
  padding: 0.7em;
  font-size: ${(props) => props.theme.fontSizes.medium};
  background-color: transparent;
  border: none;
  border-radius: 0px;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.grey4};
    transition: 0.2s;
  }
`;

const majors = Object.values(Major).map((m) => m.toString());

type Kind = "student" | "teacher";

const SignUpForm = () => {
  const [kind, setKind] = useState<Kind>("student");
  const studentId = useField("text", "StudentID");
  const username = useField("text", "Username");
  const password = useField("password", "Password");
  const major = useField(undefined, "Major");
  const subject = useField("text", "Subject");
  const email = useField("email", "Email");

  return (
    <SignUpWrapper gap="2em" $center>
      <LogoText>Join Twittur Today!</LogoText>

      <HorizontalContainer>
        <ChooseKindButton
          $active={kind === "student"}
          onClick={() => setKind("student")}
        >
          Student
        </ChooseKindButton>
        <ChooseKindButton
          $active={kind === "teacher"}
          onClick={() => setKind("teacher")}
        >
          Teacher
        </ChooseKindButton>
      </HorizontalContainer>

      <form onSubmit={(e) => e.preventDefault()}>
        <VerticalContainer gap="1em">
          <Input {...username} required />
          {kind === "student" && (
            <>
              <Input {...studentId} required />
              <Select options={majors} {...major} />
            </>
          )}
          {kind === "teacher" && (
            <>
              <Input {...subject} />
            </>
          )}
          <Input {...password} required />
          <Input {...email} required />

          <Button $rounded>Sign Up</Button>
        </VerticalContainer>
      </form>
    </SignUpWrapper>
  );
};

export default SignUpForm;
