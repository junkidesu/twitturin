import styled from "styled-components";
import { useAppSelector } from "../../hooks/store";
import useField from "../../hooks/useField";
import {
  useEditUserMutation,
  useGetUserQuery,
  useUpdateProfilePictureMutation,
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
import { useFilePicker } from "use-file-picker";
import { pictures } from "../../assets";
import ErrorPage from "../util/ErrorPage";
import lightTheme from "../../themes/lightTheme";

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

const ChosenImage = styled.img`
  width: 8em;
  height: 8em;
  border-radius: 4em;
`;

const UpdateProfilePicture = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch();
  const [updatePicture, { isLoading, isSuccess }] =
    useUpdateProfilePictureMutation();
  const { openFilePicker, plainFiles, filesContent, clear } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
  });

  useEffect(() => {
    if (isLoading) dispatch(show());
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (isSuccess) dispatch(hide());
  }, [isSuccess, dispatch]);

  const handleSubmit = async () => {
    if (plainFiles.length > 0) {
      const formData = new FormData();

      formData.append("picture", plainFiles[0]);

      await updatePicture({ id: user.id, body: formData });
    }
  };

  return (
    <Box $gap="0.1em">
      <Box $pad="l" $bg="white">
        <Heading $level={4}>Choose image</Heading>
      </Box>

      <Box $width="100%" $bg="white" $center $pad="l" $gap="1em">
        <ChosenImage
          src={
            plainFiles.length === 0 || filesContent.length === 0
              ? user.profilePicture || pictures.emptyProfilePicture
              : filesContent[0].content
          }
        />

        <Box $horizontal $width="100%" $gap="1em">
          <Button $width="100%" onClick={() => openFilePicker()}>
            Choose
          </Button>
          <Button
            $width="100%"
            $fg={lightTheme.colors.secondary}
            onClick={() => clear()}
          >
            Clear
          </Button>
        </Box>

        <Button
          $width="100%"
          onClick={handleSubmit}
          disabled={plainFiles.length === 0}
        >
          Submit
        </Button>
        <Button $width="100%" $fg="red">
          Delete
        </Button>
      </Box>
    </Box>
  );
};

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

  if (!user) return <ErrorPage />;

  return (
    <Box $width="500px" $gap="0.1em">
      <Header />

      <UpdateProfilePicture user={user} />

      <EditProfileForm user={user} />
    </Box>
  );
};

export default EditProfilePage;
