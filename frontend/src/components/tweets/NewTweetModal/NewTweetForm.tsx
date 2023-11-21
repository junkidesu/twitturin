import styled from "styled-components";
import { useEffect } from "react";
import Form from "../../core/Form";
import TextArea from "../../core/TextArea";
import Button from "../../core/Button";
import useField from "../../../hooks/useField";
import { useAddTweetMutation } from "../../../services/tweetsService";
import { useAppDispatch } from "../../../hooks/store";
import { hideModal } from "../../../reducers/modalReducer";
import Box from "../../containers/Box";
import Heading from "../../core/Heading";
import { hide, show } from "../../../reducers/loadingStripeReducer";

const SubmitButton = styled(Button)`
  &:hover {
    color: ${(props) => props.theme.colors.grey2};
  }
`;

const NewTweetForm = () => {
  const content = useField("text", "Tweet content...");
  const [addTweet, { isLoading, isSuccess }] = useAddTweetMutation();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addTweet({ content: content.value });
  };

  return (
    <Box $pad="l" $minWidth="500px" $gap="1em" $center>
      <Heading $level={2} $color="#eeeeee">
        Post New Tweet
      </Heading>

      <Form onSubmit={handleSubmit}>
        <TextArea {...content} />
        <SubmitButton $fg="#eeeeee" $bg="transparent">
          Submit
        </SubmitButton>
      </Form>
    </Box>
  );
};

export default NewTweetForm;
