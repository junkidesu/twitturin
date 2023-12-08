import TweetItem from "./TweetItem";
import Box from "../../containers/Box";
import { useGetTweetsQuery } from "../../../services/tweetsService";
import LoadingTweetList from "../../util/LoadingTweetList";

type TweetListProps = {
  author?: string;
};

const TweetList = ({ author }: TweetListProps) => {
  const { data: tweets, isLoading } = useGetTweetsQuery(author);

  if (isLoading) return <LoadingTweetList />

  if (!tweets) return <div>Some error occurred!</div>

  return (
    <Box $gap="0.1em">
      {tweets.map((t) => (
        <TweetItem key={t.id} tweet={t} />
      ))}
    </Box>
  );
};

export default TweetList;
