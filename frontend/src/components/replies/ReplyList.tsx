import { Reply } from "../../types";
import ReplyItem from "./ReplyItem";
import VStack from "../containers/VStack";

const ReplyList = ({ replies }: { replies: Reply[] }) => {
  return (
    <VStack $gap="0.5em">
      {replies.map((r) => (
        <ReplyItem key={r.id} reply={r} />
      ))}
    </VStack>
  );
};

export default ReplyList;
