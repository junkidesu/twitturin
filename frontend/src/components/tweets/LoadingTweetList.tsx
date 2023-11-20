import LoadingTweetItem from "./LoadingTweetItem";
import VStack from "../containers/VStack";

const LoadingTweetList = () => {
  return (
    <VStack $gap="0.5em">
      {[1,2,3,4,5,6,7,8,9,10].map(() => (
        <LoadingTweetItem />
      ))}
    </VStack>
  );
};

export default LoadingTweetList;
