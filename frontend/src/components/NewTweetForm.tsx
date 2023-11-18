import styled from "styled-components";
import Form from "./core/Form";
import TextArea from "./core/TextArea";
import Button from "./core/Button";
import VerticalList from "./lists/VerticalList";

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
  return (
    <Wrapper $center>
      <Label>Post New Tweet</Label>

      <Form>
        <TextArea placeholder="Tweet content..." />
        <SubmitButton $fg="#eeeeee" $bg="transparent">
          Submit
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};

export default NewTweetForm;
