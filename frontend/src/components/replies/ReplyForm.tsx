import { useEffect } from "react";
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
  id: string;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  parent: "tweet" | "reply";
};

const ReplyForm = ({ id, parent, setVisible }: Props) => {
  const [replyToTweet, { isLoading, isSuccess, isError }] = useReplyMutation();
  const { showLoadingStripe, hideLoadingStripe } = useLoadingStripe();
  const [clearContent, content] = useField("text", "Type your reply...");
  const alertUser = useAlert();

  const token = useAppSelector(({ auth }) => auth.token);

  useEffect(() => {
    if (isLoading) showLoadingStripe();
    else if (isSuccess) {
      hideLoadingStripe();
      clearContent();
      if (setVisible) setVisible(false);
    }
  }, [
    isLoading,
    isSuccess,
    clearContent,
    isError,
    setVisible,
    showLoadingStripe,
    hideLoadingStripe,
  ]);

  if (!token) return null;

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await replyToTweet({
        content: content.value,
        parent,
        parentId: id,
      }).unwrap();
    } catch (error) {
      hideLoadingStripe();
      if (error && typeof error === "object") {
        if ("data" in error) {
          if (
            error.data &&
            typeof error.data === "object" &&
            "error" in error.data
          ) {
            const errorMessage: string =
              "error" in error.data
                ? (error.data.error as string)
                : "Some error has occured! (Check the logs)";

            alertUser(errorMessage);
          }
        }
      }
    }
  };

  return (
    <Form onSubmit={handleReply}>
      <TextArea {...content} required />

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
