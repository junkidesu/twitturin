import styled from "styled-components";
import LoadingTweetDetails from "./LoadingTweetDetails";
import LoadingReplyList from "../LoadingReplyList/LoadingReplyList";
import Box from "../../containers/Box";
import BorderedBox from "../../containers/BorderedBox";
import Heading from "../../core/Heading";

const RepliesToTweet = styled(BorderedBox)`
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top: none;
`;

const LoadingTweetPage = () => {
  return (
    <Box>
      <LoadingTweetDetails />

      <RepliesToTweet $pad="l" $bg="white" $gap="0.5em">
        <Heading $level={4} $mn>
          Replies
        </Heading>

        <LoadingReplyList />
      </RepliesToTweet>
    </Box>
  );
};

export default LoadingTweetPage;
