import { Tweet } from "../../types";
import TweetItem from "./TweetItem";
import VStack from "../containers/VStack";

const TweetList = ({ tweets }: { tweets: Tweet[] }) => {
  return (
    <VStack $gap="0.5em">
      {tweets.map((t) => (
        <TweetItem key={t.id} tweet={t} />
      ))}
    </VStack>
  );
};

export default TweetList;
