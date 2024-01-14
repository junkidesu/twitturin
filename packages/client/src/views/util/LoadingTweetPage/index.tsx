import LoadingTweetDetails from "./LoadingTweetDetails";
import LoadingReplyList from "../../../components/util/LoadingReplyList";
import Box from "../../../components/containers/Box";
import PageHeading from "../../../components/util/PageHeading";

const LoadingTweetPage = () => {
  return (
    <Box $gap="0.1em" $width="500px">
      <LoadingTweetDetails />

      <PageHeading label="Replies" level={4} />

      <LoadingReplyList />
    </Box>
  );
};

export default LoadingTweetPage;
