import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import useField from "../../hooks/useField";
import { useReplyMutation } from "../../services/repliesService";
import Button from "../core/buttons/Button";
import Form from "../core/Form";
import TextArea from "../core/inputs/TextArea";
import { show, hide } from "../../reducers/loadingStripeReducer";
import lightTheme from "../../themes/lightTheme";
import Box from "../containers/Box";

type Props = {
  id: string;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  parent: "tweet" | "reply";
};

const ReplyForm = ({ id, parent, setVisible }: Props) => {
  const [replyToTweet, { isLoading, isSuccess }] = useReplyMutation();
  const dispatch = useAppDispatch();
  const [clearContent, content] = useField("text", "Type your reply...");

  const token = useAppSelector(({ auth }) => auth.token);

  useEffect(() => {
    if (isLoading) dispatch(show());
    else if (isSuccess) {
      dispatch(hide());
      if (setVisible) setVisible(false);
    }
  }, [isLoading, isSuccess, setVisible, dispatch]);

  if (!token) return null;

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await replyToTweet({ content: content.value, parent, parentId: id });
    clearContent();
  };

  return (
    <Form onSubmit={handleReply}>
      <TextArea {...content} required />

      <Box $horizontal $gap="0.5em">
        <Button $bg="white" $size="extraSmall">
          Submit
        </Button>

        {setVisible && (
          <Button
            $bg="white"
            $fg={lightTheme.colors.secondary}
            $size="extraSmall"
            onClick={() => setVisible(false)}
          >
            Cancel
          </Button>
        )}
      </Box>
    </Form>
  );
};

export default ReplyForm;
