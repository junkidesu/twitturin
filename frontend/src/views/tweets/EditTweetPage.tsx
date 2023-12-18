import { useNavigate, useParams } from "react-router-dom";
import Box from "../../components/containers/Box";
import {
  useEditTweetMutation,
  useGetTweetQuery,
} from "../../services/tweetsService";
import TextArea from "../../components/core/inputs/TextArea";
import useField from "../../hooks/useField";
import { Tweet } from "../../types";
import Button from "../../components/core/buttons/Button";
import { styled } from "styled-components";
import Form from "../../components/core/Form";
import { useAppDispatch } from "../../hooks/store";
import { useEffect } from "react";
import { hide, show } from "../../reducers/loadingStripeReducer";
import PageHeading from "../../components/util/PageHeading";

const FormWrapper = styled(Form)`
  align-items: end;
  background-color: white;
  padding: 1em;

  ${TextArea} {
    width: 100%;
  }
`;

const EditFields = ({ tweet }: { tweet: Tweet }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [editTweet, { isLoading, isSuccess }] = useEditTweetMutation();
  const [, content] = useField("text", "Content", tweet.content);

  useEffect(() => {
    if (isLoading) dispatch(show());
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(hide());
      navigate(`/tweets/${tweet.id}`);
    }
  }, [isSuccess, navigate, tweet.id, dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("editing tweet...");
    await editTweet({ id: tweet.id, content: content.value });
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <TextArea {...content} />
      <Button>Edit tweet</Button>
    </FormWrapper>
  );
};

const EditTweetPage = () => {
  const id = useParams().id;

  const { data: tweet } = useGetTweetQuery(id!);

  if (!tweet) return <div>Loading tweet...</div>;

  return (
    <Box $width="500px" $gap="0.1em">
      <PageHeading label="Edit Your Tweet" level={3} />

      <EditFields tweet={tweet} />
    </Box>
  );
};

export default EditTweetPage;
