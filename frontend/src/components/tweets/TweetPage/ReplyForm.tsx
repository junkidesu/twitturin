import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import useField from "../../../hooks/useField";
import { useReplyMutation } from "../../../services/repliesService";
import Button from "../../core/Button";
import Form from "../../core/Form";
import TextArea from "../../core/TextArea";
import Modal from "../../containers/Modal";
import LoadingSpinner from "../../LoadingSpinner";
import { hideModal, showModal } from "../../../reducers/modalReducer";

const ReplyForm = ({ id }: { id: string }) => {
  const [reply, { isLoading, isSuccess }] = useReplyMutation();
  const dispatch = useAppDispatch();
  const content = useField("text", "Type your reply...");

  const token = useAppSelector(({ auth }) => auth.token);

  useEffect(() => {
    if (isLoading) dispatch(showModal());
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (isSuccess) dispatch(hideModal());
  }, [isSuccess, dispatch]);

  if (!token) return null;

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(content.value);

    await reply({ content: content.value, tweet: id });
  };

  return (
    <Form onSubmit={handleReply}>
      <Modal>
        <LoadingSpinner label="Replying to tweet..." />
      </Modal>

      <TextArea {...content} required />
      <Button $bg="white">Submit</Button>
    </Form>
  );
};

export default ReplyForm;
