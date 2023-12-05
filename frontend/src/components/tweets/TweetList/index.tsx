import { Tweet } from "../../../types";
import TweetItem from "./TweetItem";
import Box from "../../containers/Box";

type TweetListProps = {
  tweets: Tweet[];
};

const TweetList = ({ tweets }: TweetListProps) => {
  return (
    <Box $gap="0.1em">
      {tweets.map((t) => (
        <TweetItem key={t.id} tweet={t} />
      ))}
    </Box>
  );
};

export default TweetList;
