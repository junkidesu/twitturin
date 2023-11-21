import { useGetTweetsQuery } from "../services/tweetsService";
import LoadingTweetList from "./tweets/LoadingTweetList";
import TweetList from "./tweets/TweetList";

const MainPage = () => {
  const { data: tweets, isLoading, isError } = useGetTweetsQuery();

  if (isLoading) return <LoadingTweetList />;

  if (!tweets || isError) return <div>Some error has ocurred!</div>;

  return <TweetList tweets={tweets} />;
};

export default MainPage;
