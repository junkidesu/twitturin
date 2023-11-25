import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import useField from "../../hooks/useField";
import { useReplyToTweetMutation } from "../../services/repliesService";
import Button from "../core/buttons/Button";
import Form from "../core/Form";
import TextArea from "../core/inputs/TextArea";
import { show, hide } from "../../reducers/loadingStripeReducer";

const ReplyForm = ({ tweet }: { tweet: string }) => {
  const [reply, { isLoading }] = useReplyToTweetMutation();
  const dispatch = useAppDispatch();
  const content = useField("text", "Type your reply...");

  const token = useAppSelector(({ auth }) => auth.token);

  useEffect(() => {
    if (isLoading) dispatch(show());
    else dispatch(hide());
  }, [isLoading, dispatch]);

  if (!token) return null;

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await reply({ content: content.value, parentId: tweet });
  };

  return (
    <Form onSubmit={handleReply}>
      <TextArea {...content} required />
      <Button $bg="white">Submit</Button>
    </Form>
  );
};

export default ReplyForm;
