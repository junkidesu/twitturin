import styled from "styled-components";
import VStack from "./containers/VStack";
import HStack from "./containers/HStack";
import useField from "../hooks/useField";
import Input from "./core/Input";
import Button from "./core/Button";
import Form from "./core/Form";
import { Major, NewUser } from "../types";
import Select from "./core/Select";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../services/usersService";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { useLoginMutation } from "../services/authService";
import { setCredentials } from "../reducers/authReducer";

const LogoText = styled.p`
  color: ${(props) => props.theme.colors.primary};
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
  const [signUp, { isLoading, isError, isSuccess }] = useAddUserMutation();
  const [login] = useLoginMutation();
  const [kind, setKind] = useState<Kind>("student");
  const studentId = useField("text", "StudentID");
  const username = useField("text", "Username");
  const fullName = useField("text", "Full Name");
  const password = useField("password", "Password");
  const major = useField(undefined, "Major", majors[0]);
  const subject = useField("text", "Subject");
  const email = useField("email", "Email");

  const token = useAppSelector(({ auth }) => auth.token);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      const tokenData = await login({
        username: username.value,
        password: password.value,
      }).unwrap();

      dispatch(setCredentials(tokenData));
    };

    if (isSuccess) authenticate();

    if (token) navigate("/");
  }, [
    token,
    navigate,
    isSuccess,
    dispatch,
    login,
    username.value,
    password.value,
  ]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const common = {
      username: username.value,
      password: password.value,
      email: email.value,
    };

    const newUser: NewUser =
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

    console.log(newUser);

    await signUp(newUser);
  };

  if (isLoading) return <div>Signing up...</div>;

  if (isError) return <div>Some error occurred!</div>;

  return (
    <VStack $gap="2em" $center>
      <LogoText>Join Twittur Today!</LogoText>

      <HStack style={{ width: "100%" }}>
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
      </HStack>

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
    </VStack>
  );
};

export default SignUpForm;
