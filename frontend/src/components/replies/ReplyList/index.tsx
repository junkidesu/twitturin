import { Reply } from "../../../types";
import ReplyItem from "./ReplyItem";
import Box from "../../containers/Box";
import styled from "styled-components";

const Wrapper = styled(Box)`
  justify-content: center;
`;

const ReplyList = ({
  replies,
  showChildReplies,
}: {
  replies: Reply[];
  showChildReplies?: boolean;
}) => {
  return (
    <Wrapper $gap="0.2em" $pad="m" $bg="white" $width="500px">
      {replies.map((r) => (
        <ReplyItem key={r.id} reply={r} showChildReplies={showChildReplies} />
      ))}
    </Wrapper>
  );
};

export default ReplyList;
