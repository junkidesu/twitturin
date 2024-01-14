import { useAppSelector } from "../../hooks/store";
import useField from "../../hooks/useField";
import { useReplyMutation } from "../../services/repliesService";
import Button from "../core/buttons/Button";
import Form from "../core/Form";
import TextArea from "../core/inputs/TextArea";
import lightTheme from "../../themes/lightTheme";
import Box from "../containers/Box";
import useLoadingStripe from "../../hooks/useLoadingStripe";
import useAlert from "../../hooks/useAlert";

type Props = {
  id?: string;
  parentId: string;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  parent: "tweet" | "reply";
};

const ReplyForm = ({ id, parentId, parent, setVisible }: Props) => {
  const [replyToTweet, { isLoading }] = useReplyMutation();
  const { showLoadingStripe, hideLoadingStripe } = useLoadingStripe();
  const [clearContent, content] = useField("text", "Type your reply...");
  const { errorAlert } = useAlert();

  const token = useAppSelector(({ auth }) => auth.token);

  if (!token) return null;

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    showLoadingStripe();

    try {
      await replyToTweet({
        content: content.value,
        parent,
        parentId,
      }).unwrap();

      clearContent();
      if (setVisible) setVisible(false);
    } catch (error) {
      errorAlert(error);
    }

    hideLoadingStripe();
  };

  return (
    <Form onSubmit={handleReply}>
      <TextArea {...content} required id={id} />

      <Box $horizontal $gap="0.5em">
        <Button $bg="white" $size="extraSmall" disabled={isLoading}>
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
