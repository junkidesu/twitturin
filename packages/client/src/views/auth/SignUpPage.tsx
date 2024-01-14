import styled from "styled-components";
import useField from "../../hooks/useField";
import Input from "../../components/core/inputs/Input";
import Button from "../../components/core/buttons/Button";
import Form from "../../components/core/Form";
import { Credentials, Major, NewUser } from "../../types";
import Select from "../../components/core/inputs/Select";
import DatePicker from "../../components/core/inputs/DatePicker";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../../services/usersService";
import Box from "../../components/containers/Box";
import TextArea from "../../components/core/inputs/TextArea";
import PageHeading from "../../components/util/PageHeading";
import Heading from "../../components/core/text/Heading";
import Label from "../../components/core/text/Label";
import useLoadingStripe from "../../hooks/useLoadingStripe";
import useAlert from "../../hooks/useAlert";
import useAuthentication from "../../hooks/useAuthentication";

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

const BioTextArea = styled(TextArea)`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  border: 2px solid ${({ theme }) => theme.colors.grey3};
  border-radius: 1em;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey2};
    font-size: ${({ theme }) => theme.fontSizes.extraSmall};
  }
`;

const SignUpForm = styled(Form)`
  padding: 1em;
`;

const SignUpPage = () => {
  const [signUp, { isLoading: signingUp }] = useAddUserMutation();
  const { authenticate, isLoading: authenticating } = useAuthentication();
  const { errorAlert } = useAlert();
  const [kind, setKind] = useState<Kind>("student");
  const [, studentId] = useField("text", "StudentID");
  const [, username] = useField("text", "Username");
  const [, fullName] = useField("text", "Full Name");
  const [, bio] = useField("text", "Biography");
  const [, password] = useField("password", "Password");
  const [, major] = useField(undefined, "Major", majors[0]);
  const [, subject] = useField("text", "Subject");
  const [, birthday] = useField("date", "Birthday");
  const { showLoadingStripe, hideLoadingStripe } = useLoadingStripe();

  const navigate = useNavigate();

  const isLoading = signingUp || authenticating;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const common = {
      username: username.value,
      password: password.value,
      fullName: fullName.value ? fullName.value : undefined,
      bio: bio.value ? bio.value : undefined,
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

    const credentials: Credentials = {
      username: username.value,
      password: password.value,
    };

    showLoadingStripe();

    try {
      await signUp(newUser).unwrap();

      await authenticate(credentials);
      navigate("/");
    } catch (error) {
      errorAlert(error);
    }

    hideLoadingStripe();
  };

  return (
    <Box $gap="0.1em" $width="500px">
      <PageHeading label="Join Twittur Today" />

      <Box $horizontal>
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
        <Heading $level={4}>User Information</Heading>
        <Input {...username} required id="username" />
        <Input {...password} required id="password" />

        {kind === "student" && (
          <>
            <Heading $level={4}>Student Information</Heading>
            <Select options={majors} {...major} required id="select-major" />
            <Input {...studentId} required id="student-id" />
          </>
        )}

        {kind === "teacher" && (
          <>
            <Heading $level={4}>Teacher Information</Heading>
            <Input {...subject} required id="subject" />
          </>
        )}

        <Heading $level={4}>Optional Information</Heading>
        <Label $size="extraSmall" $bold>
          Birthday
        </Label>
        <DatePicker {...birthday} id="birthday-picker" />
        <Input {...fullName} id="fullname" />
        <BioTextArea {...bio} id="bio" />

        <Button $width="100%" disabled={isLoading}>
          Sign Up
        </Button>
      </SignUpForm>
    </Box>
  );
};

export default SignUpPage;
