import LoadingReplyItem from "./LoadingReplyItem";
import Box from "../../containers/Box";

const LoadingReplyList = () => {
  return (
    <Box $gap="0.1em" $bg="white">
      <LoadingReplyItem />
      <LoadingReplyItem />
      <LoadingReplyItem />
    </Box>
  );
};

export default LoadingReplyList;
