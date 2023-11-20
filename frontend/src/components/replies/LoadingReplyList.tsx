import LoadingReplyItem from "./LoadingReplyItem";
import VStack from "../containers/VStack";

const LoadingReplyList = () => {
  return (
    <VStack $gap="0.5em">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
        <LoadingReplyItem />
      ))}
    </VStack>
  );
};

export default LoadingReplyList;
