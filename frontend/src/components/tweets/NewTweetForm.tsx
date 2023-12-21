import styled from "styled-components";
import { useEffect } from "react";
import Form from "../core/Form";
import TextArea from "../core/inputs/TextArea";
import Button from "../core/buttons/Button";
import useField from "../../hooks/useField";
import { useAddTweetMutation } from "../../services/tweetsService";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { hideModal } from "../../reducers/modalReducer";
import { pictures } from "../../assets";
import { useGetUserQuery } from "../../services/usersService";
import Card from "../containers/Card";
import useLoadingStripe from "../../hooks/useLoadingStripe";
import useAlert from "../../hooks/useAlert";

const TweetTextArea = styled(TextArea)`
  border: none;
  box-sizing: border-box;
  padding-top: 0;
  width: 100%;
`;

const ProfilePicture = styled.img`
  width: 2em;
  height: 2em;
  box-sizing: border-box;
  border-radius: 10em;
  cursor: pointer;
`;

const FormWrapper = styled(Form)`
  align-items: end;
  width: 100%;
  padding: 0;
`;

const NewTweetForm = ({ className }: { className?: string }) => {
  const [clearContent, content] = useField("text", "Tweet your thoughts");
  const id = useAppSelector(({ auth }) => auth.id);
  const { data: user } = useGetUserQuery(id!);
  const [addTweet, { isLoading, isSuccess }] = useAddTweetMutation();
  const dispatch = useAppDispatch();
  const { showLoadingStripe, hideLoadingStripe } = useLoadingStripe();
  const alertUser = useAlert();

  useEffect(() => {
    if (isLoading) showLoadingStripe();
  }, [isLoading, showLoadingStripe]);

  useEffect(() => {
    if (isSuccess) {
      hideLoadingStripe();
      dispatch(hideModal());
    }
  }, [isSuccess, hideLoadingStripe, dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addTweet({ content: content.value }).unwrap();
      clearContent();
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
    <Card $horizontal className={className}>
      <ProfilePicture
        src={user?.profilePicture || pictures.emptyProfilePicture}
      />

      <FormWrapper onSubmit={handleSubmit}>
        <TweetTextArea {...content} required />

        <Button $bg="white" disabled={isLoading}>
          Tweet
        </Button>
      </FormWrapper>
    </Card>
  );
};

export default NewTweetForm;
