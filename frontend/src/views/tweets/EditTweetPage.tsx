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
import { useEffect } from "react";
import PageHeading from "../../components/util/PageHeading";
import useAlert from "../../hooks/useAlert";
import useLoadingStripe from "../../hooks/useLoadingStripe";

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
  const { showLoadingStripe, hideLoadingStripe } = useLoadingStripe();
  const [editTweet, { isLoading, isSuccess }] = useEditTweetMutation();
  const [, content] = useField("text", "Content", tweet.content);
  const alertUser = useAlert();

  useEffect(() => {
    if (isLoading) showLoadingStripe();
  }, [isLoading, showLoadingStripe]);

  useEffect(() => {
    if (isSuccess) {
      hideLoadingStripe();
      navigate(`/tweets/${tweet.id}`);
    }
  }, [isSuccess, navigate, tweet.id, hideLoadingStripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await editTweet({ id: tweet.id, content: content.value }).unwrap();
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
