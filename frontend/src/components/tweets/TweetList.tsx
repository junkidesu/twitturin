import { Tweet } from "../../types";
import TweetItem from "./TweetItem";
import VerticalContainer from "../containers/VerticalContainer";

const TweetList = ({ tweets }: { tweets: Tweet[] }) => {
  return (
    <VerticalContainer gap="0.5em">
      {tweets.map((t) => (
        <TweetItem key={t.id} tweet={t} />
      ))}
    </VerticalContainer>
  );
};

export default TweetList;
