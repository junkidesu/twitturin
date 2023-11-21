import LoadingTweetItem from "./LoadingTweetItem";
import VBox from "../containers/VBox";

const LoadingTweetList = () => {
  return (
    <VBox $gap="0.5em">
      {[1,2,3,4,5,6,7,8,9,10].map(() => (
        <LoadingTweetItem />
      ))}
    </VBox>
  );
};

export default LoadingTweetList;
