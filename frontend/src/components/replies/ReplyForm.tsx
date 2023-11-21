import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import useField from "../../hooks/useField";
import { useReplyMutation } from "../../services/repliesService";
import Button from "../core/buttons/Button";
import Form from "../core/Form";
import TextArea from "../core/input/TextArea";
import { show, hide } from "../../reducers/loadingStripeReducer";

const ReplyForm = ({ id }: { id: string }) => {
  const [reply, { isLoading, isSuccess }] = useReplyMutation();
  const dispatch = useAppDispatch();
  const content = useField("text", "Type your reply...");

  const token = useAppSelector(({ auth }) => auth.token);

  useEffect(() => {
    if (isLoading) dispatch(show());
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (isSuccess) dispatch(hide());
  }, [isSuccess, dispatch]);

  if (!token) return null;

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
