import styled from "styled-components";
import { useEffect } from "react";
import Form from "../core/Form";
import TextArea from "../core/inputs/TextArea";
import Button from "../core/buttons/Button";
import useField from "../../hooks/useField";
import { useAddTweetMutation } from "../../services/tweetsService";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { hideModal } from "../../reducers/modalReducer";
import Box from "../containers/Box";
import { hide, show } from "../../reducers/loadingStripeReducer";
import { pictures } from "../../assets";
import { useGetUserQuery } from "../../services/usersService";

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
  const [addTweet, { isLoading, isSuccess, isError }] = useAddTweetMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoading) dispatch(show());
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(hide());
      dispatch(hideModal());
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(hide());
      console.log("error");
    }
  }, [isError, dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addTweet({ content: content.value });
    clearContent();
  };

  return (
    <Box $horizontal $pad="l" $bg="white" $width="100%" className={className}>
      <ProfilePicture
        src={user?.profilePicture || pictures.emptyProfilePicture}
      />

      <FormWrapper onSubmit={handleSubmit}>
        <TweetTextArea {...content} required />

        <Button $bg="white">Tweet</Button>
      </FormWrapper>
    </Box>
  );
};

export default NewTweetForm;
