import styled from "styled-components";
import TweetList from "./tweets/TweetList";
import Box from "./containers/Box";
import { pictures } from "../assets";
import TextArea from "./core/inputs/TextArea";
import Button from "./core/buttons/Button";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import Form from "./core/Form";
import { useEffect } from "react";
import useField from "../hooks/useField";
import { hide, show } from "../reducers/loadingStripeReducer";
import { useAddTweetMutation } from "../services/tweetsService";

const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 100%;
`;

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

const CreateTweetForm = () => {
  const [clearContent, content] = useField("text", "Tweet your thoughts now!");
  const [addTweet, { isLoading, isSuccess }] = useAddTweetMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoading) dispatch(show());
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(hide());
    }
  }, [isSuccess, dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addTweet({ content: content.value });
    clearContent();
  };

  return (
    <Box $horizontal $pad="l" $bg="white" $width="500px">
      <ProfilePicture src={pictures.emptyProfilePicture} />

      <FormWrapper onSubmit={handleSubmit}>
        <TweetTextArea {...content} />

        <Button $bg="white">Tweet</Button>
      </FormWrapper>
    </Box>
  );
};

const MainPage = () => {
  const username = useAppSelector(({ auth }) => auth?.username);

  return (
    <Box $gap="0.1em">
      {username && <CreateTweetForm />}

      <TweetList />
    </Box>
  );
};

export default MainPage;
