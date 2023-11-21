import { Tweet } from "../../types";
import TweetItem from "./TweetItem";
import Box from "../containers/Box";

const TweetList = ({ tweets }: { tweets: Tweet[] }) => {
  return (
    <Box $gap="0.5em">
      {tweets.map((t) => (
        <TweetItem key={t.id} tweet={t} />
      ))}
    </Box>
  );
};

export default TweetList;
