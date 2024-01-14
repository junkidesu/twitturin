import styled from "styled-components";
import { useAppSelector } from "../../hooks/store";
import useField from "../../hooks/useField";
import {
  useEditUserMutation,
  useGetUserQuery,
} from "../../services/usersService";
import {
  useRemoveAvatarMutation,
  useSetAvatarMutation,
} from "../../services/avatarService";
import Box from "../../components/containers/Box";
import Form from "../../components/core/Form";
import DatePicker from "../../components/core/inputs/DatePicker";
import Input from "../../components/core/inputs/Input";
import { EditUser, User } from "../../types";
import TextArea from "../../components/core/inputs/TextArea";
import Button from "../../components/core/buttons/Button";
import { useEffect, useState } from "react";
import useLoadingStripe from "../../hooks/useLoadingStripe";
import { useNavigate } from "react-router-dom";
import { useFilePicker } from "use-file-picker";
import { icons, pictures } from "../../assets";
import ErrorPage from "../util/ErrorPage";
import lightTheme from "../../themes/lightTheme";
import PageHeading from "../../components/util/PageHeading";
import Card from "../../components/containers/Card";
import useAlert from "../../hooks/useAlert";

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
  const { showLoadingStripe, hideLoadingStripe } = useLoadingStripe();
  const [setAvatar, { isLoading: settingAvatar }] = useSetAvatarMutation();
  const [removeAvatar, { isLoading: removingAvatar }] =
    useRemoveAvatarMutation();
  const { errorAlert } = useAlert();
  const { openFilePicker, filesContent, clear } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    onClear: () => setProfilePicture(undefined),
    onFilesSuccessfullySelected: (files) => {
      setProfilePicture(files.plainFiles[0]);
    },
  });

  const isLoading = settingAvatar || removingAvatar;

  const handleUpdate = async () => {
    if (profilePicture) {
      const formData = new FormData();

      formData.append("picture", profilePicture);

      showLoadingStripe();

      try {
        await setAvatar({ id: user.id, body: formData }).unwrap();
        setProfilePicture(undefined);
      } catch (error) {
        errorAlert(error);
      }

      hideLoadingStripe();
    }
  };

  const handleDelete = async () => {
    if (user.profilePicture) {
      showLoadingStripe();

      try {
        await removeAvatar(user).unwrap();
        setProfilePicture(undefined);
      } catch (error) {
        errorAlert(error);
      }

      hideLoadingStripe();
    }
  };

  return (
    <Box $gap="0.1em">
      <PageHeading level={4} label="Choose Image" />

      <Card $gap="1em" $center>
        <ChosenImage
          src={
            !profilePicture
              ? user.profilePicture || pictures.emptyProfilePicture
              : filesContent[0].content
          }
        />

        <Box $horizontal $width="100%" $gap="1em">
          <Button
            $width="100%"
            onClick={() => openFilePicker()}
            disabled={isLoading}
          >
            Choose
          </Button>
          <Button
            $width="100%"
            $fg={lightTheme.colors.secondary}
            onClick={() => clear()}
            disabled={!profilePicture || isLoading}
          >
            Clear
          </Button>
        </Box>

        <Button
          $width="100%"
          onClick={handleUpdate}
          disabled={!profilePicture || isLoading}
        >
          Update
        </Button>

        <Button
          $width="100%"
          onClick={handleDelete}
          disabled={!user.profilePicture || isLoading}
          $fg="#ff0037"
        >
          {<icons.RemoveIcon />}
          Delete
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
  const { showLoadingStripe, hideLoadingStripe } = useLoadingStripe();
  const [edit, { isLoading }] = useEditUserMutation();
  const { errorAlert } = useAlert();

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

    showLoadingStripe();
    try {
      await edit({ id: user.id, body: toEdit }).unwrap();
      navigate(`/users/${user.id}`);
    } catch (error) {
      errorAlert(error);
    }

    hideLoadingStripe();
  };

  return (
    <FormWrapper onSubmit={onSubmit}>
      <Input {...username} required />
      <Input {...fullName} />
      <BioTextArea {...bio} />
      <Input {...email} />
      <Input {...country} />
      <DatePicker {...birthday} />

      <Button $width="100%" disabled={isLoading}>
        Submit
      </Button>
    </FormWrapper>
  );
};

const EditProfilePage = () => {
  const id = useAppSelector(({ auth }) => auth.id);
  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserQuery(id!, { skip: !id });
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) navigate("/login");
  }, [id, navigate]);

  if (isError) return <ErrorPage />;

  if (isLoading) return <Card>User loading...</Card>;

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
