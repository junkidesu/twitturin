import { Tweet } from "../../types";
import TweetItem from "./TweetItem";
import VerticalList from "../lists/VerticalList";

const TweetList = ({ tweets }: { tweets: Tweet[] }) => {
  return (
    <VerticalList $gap="0.5em">
      {tweets.map((t) => (
        <TweetItem key={t.id} tweet={t} />
      ))}
    </VerticalList>
  );
};

export default TweetList;
