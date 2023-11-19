import styled from "styled-components";
import VerticalList from "./lists/VerticalList";
import HorizontalList from "./lists/HorizontalList";
import useField from "../hooks/useField";
import Input from "./core/Input";
import Button from "./core/Button";
import Form from "./core/Form";
import { Major, SignUpFormValues } from "../types";
import Select from "./core/Select";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/store";

const LogoText = styled.p`
  color: teal;
  margin: 0;
  font-weight: bold;
  font-size: 2em;
  transition: 0.3s;
`;

const KindButton = styled.button<{ $active: boolean }>`
  width: 100%;
  color: ${(props) =>
    props.$active ? props.theme.colors.primary : props.theme.colors.grey2};
  padding: 0.7em;
  font-size: ${(props) => props.theme.fontSizes.medium};
  background-color: ${(props) =>
    props.$active ? props.theme.colors.grey4 : "transparent"};
  border: none;
  border-radius: ${(props) => (props.$active ? "10px" : "0px")};
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
  const fullName = useField("text", "Full Name");
  const password = useField("password", "Password");
  const major = useField(undefined, "Major", majors[0]);
  const subject = useField("text", "Subject");
  const email = useField("email", "Email");

  const token = useAppSelector(({ auth }) => auth.token);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const common = {
      username: username.value,
      password: password.value,
      email: email.value,
    };

    const toSignUp: SignUpFormValues =
      kind === "student"
        ? {
            ...common,
            kind,
            studentId: studentId.value,
            major: major.value as Major,
          }
        : {
            ...common,
            kind,
            subject: subject.value,
          };

    console.log(toSignUp);
  };

  return (
    <VerticalList $gap="2em" $center>
      <LogoText>Join Twittur Today!</LogoText>

      <HorizontalList style={{ width: "100%" }}>
        <KindButton
          $active={kind === "student"}
          onClick={() => setKind("student")}
        >
          Student
        </KindButton>
        <KindButton
          $active={kind === "teacher"}
          onClick={() => setKind("teacher")}
        >
          Teacher
        </KindButton>
      </HorizontalList>

      <Form onSubmit={onSubmit}>
        <Input {...username} required />
        <Input {...email} required />
        <Input {...fullName} />

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

        <Button $rounded>Sign Up</Button>
      </Form>
    </VerticalList>
  );
};

export default SignUpForm;
