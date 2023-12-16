import TweetItem from "./TweetItem";
import Box from "../../containers/Box";
import { useGetTweetsQuery } from "../../../services/tweetsService";
import LoadingTweetList from "../../util/LoadingTweetList";
import Empty from "../../util/Empty";

type TweetListProps = {
  author?: string;
};

const TweetList = ({ author }: TweetListProps) => {
  const { data: tweets, isLoading } = useGetTweetsQuery(author);

  if (isLoading) return <LoadingTweetList />;

  if (!tweets) return <div>Some error occurred!</div>;

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
