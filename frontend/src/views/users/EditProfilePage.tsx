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
import { EditUser, User } from "../../types";
import TextArea from "../../components/core/inputs/TextArea";
import Button from "../../components/core/buttons/Button";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/store";
import { show, hide } from "../../reducers/loadingStripeReducer";
import { useNavigate } from "react-router-dom";
import { useFilePicker } from "use-file-picker";
import { pictures } from "../../assets";
import ErrorPage from "../util/ErrorPage";
import lightTheme from "../../themes/lightTheme";
import PageHeading from "../../components/util/PageHeading";
import Card from "../../components/containers/Card";

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
  const [profilePicture, setProfilePicture] = useState<File | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const [updatePicture, { isLoading, isSuccess }] =
    useUpdateProfilePictureMutation();
  const { openFilePicker, filesContent, clear } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    onClear: () => setProfilePicture(undefined),
    onFilesSuccessfullySelected: (files) => {
      setProfilePicture(files.plainFiles[0]);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(hide());
      setProfilePicture(undefined);
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (isLoading) dispatch(show());
  }, [isLoading, dispatch]);

  const handleSubmit = async () => {
    if (profilePicture) {
      const formData = new FormData();

      formData.append("picture", profilePicture);

      await updatePicture({ id: user.id, body: formData });
    }
  };

  return (
    <Box $gap="0.1em">
      <PageHeading level={4} label="Choose Image" />

      <Card $gap="1em">
        <ChosenImage
          src={
            !profilePicture
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
            disabled={!profilePicture}
          >
            Clear
          </Button>
        </Box>

        <Button $width="100%" onClick={handleSubmit} disabled={!profilePicture}>
          Submit
        </Button>
      </Card>
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
      <PageHeading label="Edit Your Profile" />

      <UpdateProfilePicture user={user} />

      <PageHeading level={4} label="Edit User Info" />

      <EditProfileForm user={user} />
    </Box>
  );
};

export default EditProfilePage;
