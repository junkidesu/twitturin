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
import useLoadingStripe from "../../hooks/useLoadingStripe";
import { useNavigate } from "react-router-dom";
import { useFilePicker } from "use-file-picker";
import { pictures } from "../../assets";
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
  const [updatePicture, { isLoading, isSuccess }] =
    useUpdateProfilePictureMutation();
  const alertUser = useAlert();
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
      hideLoadingStripe();
      setProfilePicture(undefined);
    }
  }, [isSuccess, hideLoadingStripe]);

  useEffect(() => {
    if (isLoading) showLoadingStripe();
  }, [isLoading, showLoadingStripe]);

  const handleSubmit = async () => {
    if (profilePicture) {
      const formData = new FormData();

      formData.append("picture", profilePicture);

      try {
        await updatePicture({ id: user.id, body: formData }).unwrap();
      } catch (error) {
        hideLoadingStripe();
        if (error && typeof error === "object") {
          if ("data" in error) {
            if (
              error.data &&
              typeof error.data === "object" &&
              "error" in error.data
            ) {
              const errorMessage: string =
                "error" in error.data
                  ? (error.data.error as string)
                  : "Some error has occured! (Check the logs)";

              alertUser(errorMessage);
            }
          }
        }
      }
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
          onClick={handleSubmit}
          disabled={!profilePicture || isLoading}
        >
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
  const { showLoadingStripe, hideLoadingStripe } = useLoadingStripe();
  const [edit, { isLoading, isSuccess }] = useEditUserMutation();
  const alertUser = useAlert();

  useEffect(() => {
    if (isLoading) showLoadingStripe();
  }, [isLoading, showLoadingStripe]);

  useEffect(() => {
    if (isSuccess) {
      hideLoadingStripe();
      navigate(`/users/${user.id}`);
    }
  }, [isSuccess, hideLoadingStripe, navigate, user.id]);

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

    try {
      await edit({ id: user.id, body: toEdit }).unwrap();
    } catch (error) {
      hideLoadingStripe();

      if (error && typeof error === "object") {
        if ("data" in error) {
          if (
            error.data &&
            typeof error.data === "object" &&
            "error" in error.data
          ) {
            const errorMessage: string =
              "error" in error.data
                ? (error.data.error as string)
                : "Some error has occured! (Check the logs)";

            alertUser(errorMessage);
          }
        }
      }
    }
  };

  return (
    <FormWrapper onSubmit={onSubmit}>
      <Input {...username} required />
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
