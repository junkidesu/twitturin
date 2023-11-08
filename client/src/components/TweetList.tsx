import { Tweet } from "../types";
import TweetItem from "./TweetItem";
import VerticalContainer from "./VerticalContainer";

const TweetList = ({ tweets }: { tweets: Tweet[] }) => {
  return (
    <VerticalContainer>
      {tweets.map((t) => (
        <TweetItem key={t.id} tweet={t} />
      ))}
    </VerticalContainer>
  );
};

export default TweetList;
