import LoadingTweetDetails from "./LoadingTweetDetails";
import LoadingReplyList from "../../../components/util/LoadingReplyList";
import Box from "../../../components/containers/Box";
import Heading from "../../../components/core/text/Heading";

const LoadingTweetPage = () => {
  return (
    <Box $gap="0.1em" $maxWidth="500px" $width="500px">
      <LoadingTweetDetails />

      <Box $bg="white" $pad="l">
        <Heading $level={4}>Replies</Heading>
      </Box>

      <LoadingReplyList />
    </Box>
  );
};

export default LoadingTweetPage;
