import Modal from "../../lists/Modal";
import TweetItem from "../TweetItem";
import Form from "../../core/Form";
import TextArea from "../../core/TextArea";
import Button from "../../core/Button";
import VerticalList from "../../lists/VerticalList";
import { Tweet } from "../../../types";
import styled from "styled-components";

interface Props {
  tweet: Tweet;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReplyButton = styled(Button)`
  &:hover {
    color: ${(props) => props.theme.colors.grey2};
  }
`;

const ReplyModal = ({ visible, setVisible, tweet }: Props) => (
  <Modal visible={visible} setVisible={setVisible}>
    <VerticalList $gap="0">
      <TweetItem tweet={tweet} />

      <Form onSubmit={(e) => e.preventDefault()}>
        <TextArea placeholder="Type a reply..." />
        <ReplyButton $bg="transparent" $fg="#eeeeee">
          Submit
        </ReplyButton>
      </Form>
    </VerticalList>
  </Modal>
);

export default ReplyModal;
