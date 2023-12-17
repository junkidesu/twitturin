import styled from "styled-components";
import useField from "../../hooks/useField";
import Input from "../core/inputs/Input";
import Button from "../core/buttons/Button";
import Form from "../core/Form";
import { Major, NewUser } from "../../types";
import Select from "../core/inputs/Select";
import DatePicker from "../core/inputs/DatePicker";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../../services/usersService";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useLoginMutation } from "../../services/authService";
import { setCredentials } from "../../reducers/authReducer";
import { show, hide } from "../../reducers/loadingStripeReducer";
import Heading from "../core/text/Heading";
import Box from "../containers/Box";
import TextArea from "../core/inputs/TextArea";

const KindButton = styled.button<{ $active: boolean }>`
  width: 100%;
  color: ${(props) =>
    props.$active ? props.theme.colors.primary : props.theme.colors.grey2};
  padding: 0.7em;
  background-color: white;
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  border: none;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.grey4};
    transition: 0.2s;
  }
`;

const majors = Object.values(Major).map((m) => m.toString());

type Kind = "student" | "teacher";

const SignUpHeading = () => {
  return (
    <Box $bg="white" $pad="l">
      <Heading $level={2}>Join Twittur Today</Heading>
    </Box>
  );
};

const BioTextArea = styled(TextArea)`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  border: 2px solid ${({ theme }) => theme.colors.grey3};
  border-radius: 10px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey1};
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`;

const SignUpForm = styled(Form)`
  padding: 1em;
`;

const SignUpPage = () => {
  const [signUp, { isLoading, isError, isSuccess }] = useAddUserMutation();
  const [login] = useLoginMutation();
  const [kind, setKind] = useState<Kind>("student");
  const [, studentId] = useField("text", "StudentID");
  const [, username] = useField("text", "Username");
  const [, fullName] = useField("text", "Full Name");
  const [, bio] = useField("text", "Biography");
  const [, country] = useField("text", "Country");
  const [, password] = useField("password", "Password");
  const [, major] = useField(undefined, "Major", majors[0]);
  const [, subject] = useField("text", "Subject");
  const [, email] = useField("email", "Email");
  const [, birthday] = useField("date", "Birthday");

  const token = useAppSelector(({ auth }) => auth.token);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) dispatch(show());
  }, [isLoading, dispatch]);

  useEffect(() => {
    if(isError) {
      dispatch(hide());
    }
  }, [isError, dispatch]);

  useEffect(() => {
    const authenticate = async () => {
      const tokenData = await login({
        username: username.value,
        password: password.value,
      }).unwrap();

      dispatch(setCredentials(tokenData));
    };

    if (isSuccess) {
      dispatch(hide());
      authenticate();
    }

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
      fullName: fullName.value ? fullName.value : undefined,
      bio: bio.value ? bio.value : undefined,
      country: country.value ? country.value : undefined,
      birthday: birthday.value,
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

  if (isError) return <div>Some error occurred!</div>;

  return (
    <Box $gap="0.1em" $width="500px">
      <SignUpHeading />

      <Box $horizontal $width="100%" $bg="white">
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
      </Box>

      <SignUpForm onSubmit={onSubmit}>
        <Input {...username} required />
        <Input {...email} required />
        <Input {...fullName} />
        <Input {...country} />
        <BioTextArea {...bio} />
        <DatePicker {...birthday} />

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

        <Button $width="100%">Sign Up</Button>
      </SignUpForm>
    </Box>
  );
};

export default SignUpPage;
