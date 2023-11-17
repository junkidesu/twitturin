import { Reply } from "../../types";
import ReplyItem from "./ReplyItem";
import VerticalContainer from "../containers/VerticalContainer";

const ReplyList = ({ replies }: { replies: Reply[] }) => {
  return (
    <VerticalContainer gap="0.5em">
      {replies.map((r) => (
        <ReplyItem key={r.id} reply={r} />
      ))}
    </VerticalContainer>
  );
};

export default ReplyList;
