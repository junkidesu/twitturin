import styled from "styled-components";
import Form from "../core/Form";
import TextArea from "../core/TextArea";
import Button from "../core/Button";
import VerticalList from "../lists/VerticalList";
import useField from "../../hooks/useField";
import { useAddTweetMutation } from "../../services/tweetsService";

const Wrapper = styled(VerticalList)`
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
  const [addTweet, { isLoading }] = useAddTweetMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(content.value);

    await addTweet({ content: content.value });
  };

  if (isLoading) return <div>Posting your tweet...</div>;

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
