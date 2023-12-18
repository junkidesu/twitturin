import styled from "styled-components";
import { useAppSelector } from "../../hooks/store";
import useField from "../../hooks/useField";
import {
  useEditUserMutation,
  useGetUserQuery,
} from "../../services/usersService";
import Box from "../../components/containers/Box";
import Form from "../../components/core/Form";
import DatePicker from "../../components/core/inputs/DatePicker";
import Input from "../../components/core/inputs/Input";
import Heading from "../../components/core/text/Heading";
import { EditUser, User } from "../../types";
import TextArea from "../../components/core/inputs/TextArea";
import Button from "../../components/core/buttons/Button";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/store";
import { show, hide } from "../../reducers/loadingStripeReducer";
import { useNavigate } from "react-router-dom";

const Header = () => {
  return (
    <Box $pad="l" $bg="white">
      <Heading $level={2}>Edit Profile Page</Heading>
    </Box>
  );
};

const FormWrapper = styled(Form)`
  padding: 1em;
`;

const BioTextArea = styled(TextArea)`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  border: 2px solid ${({ theme }) => theme.colors.grey3};
  border-radius: 10px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey1};
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`;

const EditProfileForm = ({ user }: { user: User }) => {
  const [, username] = useField("text", "Username", user.username);
  const [, fullName] = useField("text", "Full Name", user.fullName);
  const [, bio] = useField("text", "Biography", user.bio);
  const [, email] = useField("email", "Email", user.email);
  const [, country] = useField("text", "Country", user.country);
  const [, birthday] = useField("date", "Birthday", user.birthday);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [edit, { isLoading, isSuccess }] = useEditUserMutation();

  useEffect(() => {
    if (isLoading) dispatch(show());
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(hide());
      navigate(`/users/${user.id}`);
    }
  }, [isSuccess, dispatch, navigate, user.id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toEdit: EditUser = {
      username: username.value,
      fullName: fullName.value,
      bio: bio.value,
      email: email.value,
      country: country.value,
      birthday: birthday.value,
    };

    await edit({ id: user.id, body: toEdit });
  };

  return (
    <FormWrapper onSubmit={onSubmit}>
      <Input {...username} />
      <Input {...fullName} />
      <BioTextArea {...bio} />
      <Input {...email} />
      <Input {...country} />
      <DatePicker {...birthday} />

      <Button $width="100%">Edit Profile</Button>
    </FormWrapper>
  );
};

const EditProfilePage = () => {
  const id = useAppSelector(({ auth }) => auth.id);
  const { data: user, isLoading } = useGetUserQuery(id!, { skip: !id });
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) navigate("/login");
  }, [id, navigate]);

  if (isLoading) return <div>User loading...</div>;

  if (!user) return <div>Some error occurred!</div>;

  return (
    <Box $width="500px" $gap="0.1em">
      <Header />

      <Box $pad="l" $bg="white">
        <Heading $level={4}>Choose image</Heading>
      </Box>

      <EditProfileForm user={user} />
    </Box>
  );
};

export default EditProfilePage;
