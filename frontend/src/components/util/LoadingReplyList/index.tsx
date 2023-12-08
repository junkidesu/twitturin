import LoadingReplyItem from "./LoadingReplyItem";
import Box from "../../containers/Box";

const LoadingReplyList = () => {
  return (
    <Box $gap="0.1em" $bg="white">
      {[1, 2, 3, 4, 5].map((n) => (
        <LoadingReplyItem key={n} />
      ))}
    </Box>
  );
};

export default LoadingReplyList;
