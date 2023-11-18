import { Reply } from "../../types";
import ReplyItem from "./ReplyItem";
import VerticalList from "../lists/VerticalList";

const ReplyList = ({ replies }: { replies: Reply[] }) => {
  return (
    <VerticalList $gap="0.5em">
      {replies.map((r) => (
        <ReplyItem key={r.id} reply={r} />
      ))}
    </VerticalList>
  );
};

export default ReplyList;
