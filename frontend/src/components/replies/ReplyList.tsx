import { Reply } from "../../types";
import ReplyItem from "./ReplyItem";
import Box from "../containers/Box";

const ReplyList = ({ replies }: { replies: Reply[] }) => {
  return (
    <Box $gap="0.5em">
      {replies.map((r) => (
        <ReplyItem key={r.id} reply={r} />
      ))}
    </Box>
  );
};

export default ReplyList;
