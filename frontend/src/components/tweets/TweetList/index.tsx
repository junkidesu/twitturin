import TweetItem from "./TweetItem";
import Box from "../../containers/Box";
import Empty from "../../util/Empty";
import { Tweet } from "../../../types";

type TweetListProps = {
  tweets: Tweet[];
};

const TweetList = ({ tweets }: TweetListProps) => {
  if (tweets.length === 0) return <Empty />;

  return (
    <Box $gap="0.1em">
      {tweets.map((t) => (
        <TweetItem key={t.id} tweet={t} />
      ))}
    </Box>
  );
};

export default TweetList;
