import styled from "styled-components";
import { useEffect } from "react";
import Form from "../../core/Form";
import TextArea from "../../core/TextArea";
import Button from "../../core/Button";
import VStack from "../../containers/VStack";
import useField from "../../../hooks/useField";
import { useAddTweetMutation } from "../../../services/tweetsService";
import LoadingSpinner from "../../LoadingSpinner";
import { useAppDispatch } from "../../../hooks/store";
import { hideModal } from "../../../reducers/modalReducer";

const Wrapper = styled(VStack)`
  min-width: 500px;
  padding: 1em;
`;

const SubmitButton = styled(Button)`
  &:hover {
    color: ${(props) => props.theme.colors.grey2};
  }
`;

const Label = styled.p`
  margin: none;
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: bold;
  color: white;
`;

const NewTweetForm = () => {
  const content = useField("text", "Tweet content...");
  const [addTweet, { isLoading, isSuccess }] = useAddTweetMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) dispatch(hideModal());
  }, [isSuccess, dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(content.value);

    await addTweet({ content: content.value });
  };

  if (isLoading) return <LoadingSpinner label="Posting your tweet..." />;

  return (
    <Wrapper $center>
      <Label>Post New Tweet</Label>

      <Form onSubmit={handleSubmit}>
        <TextArea {...content} />
        <SubmitButton $fg="#eeeeee" $bg="transparent">
          Submit
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};

export default NewTweetForm;
