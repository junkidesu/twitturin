import { useAppSelector } from "../../../hooks/store";
import useField from "../../../hooks/useField";
import { useReplyMutation } from "../../../services/repliesService";
import Button from "../../core/Button";
import Form from "../../core/Form";
import TextArea from "../../core/TextArea";

const ReplyForm = ({ id }: { id: string }) => {
  const [reply] = useReplyMutation();
  const content = useField("text", "Type your reply...");

  const token = useAppSelector(({ auth }) => auth.token);

  if (!token) return null;

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(content.value);

    await reply({ content: content.value, tweet: id });
  };

  return (
    <Form onSubmit={handleReply}>
      <TextArea {...content} required />
      <Button $bg="white">Submit</Button>
    </Form>
  );
};

export default ReplyForm;
