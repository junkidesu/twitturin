import { Reply } from "../../../types";
import ReplyItem from "./ReplyItem";
import Box from "../../containers/Box";

const ReplyList = ({
  replies,
  showChildReplies,
}: {
  replies: Reply[];
  showChildReplies?: boolean;
}) => {
  return (
    <Box $gap="0.5em" $pad="m" $bg="white">
      {replies.map((r) => (
        <ReplyItem key={r.id} reply={r} showChildReplies={showChildReplies} />
      ))}
    </Box>
  );
};

export default ReplyList;
