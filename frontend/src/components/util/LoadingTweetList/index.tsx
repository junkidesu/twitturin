import LoadingTweetItem from "./LoadingTweetItem";
import Box from "../../containers/Box";

const LoadingTweetList = () => {
  return (
    <Box $gap="0.1em">
      <LoadingTweetItem />
      <LoadingTweetItem />
      <LoadingTweetItem />
    </Box>
  );
};

export default LoadingTweetList;
