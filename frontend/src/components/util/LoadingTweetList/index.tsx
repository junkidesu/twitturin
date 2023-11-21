import LoadingTweetItem from "./LoadingTweetItem";
import Box from "../../containers/Box";

const LoadingTweetList = () => {
  return (
    <Box $gap="0.5em">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
        <LoadingTweetItem key={n} />
      ))}
    </Box>
  );
};

export default LoadingTweetList;
