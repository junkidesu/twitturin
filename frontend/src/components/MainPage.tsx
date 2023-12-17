import TweetList from "./tweets/TweetList";
import Box from "./containers/Box";
import { useAppSelector } from "../hooks/store";
import NewTweetForm from "./tweets/NewTweetForm";
import { useGetTweetsQuery } from "../services/tweetsService";
import LoadingTweetList from "./util/LoadingTweetList";

const MainPage = () => {
  const username = useAppSelector(({ auth }) => auth?.username);
  const { data: tweets, isLoading } = useGetTweetsQuery(undefined);

  return (
    <Box $gap="0.1em" $width="500px">
      {username && <NewTweetForm />}

      {isLoading ? <LoadingTweetList /> : <TweetList tweets={tweets!} />}
    </Box>
  );
};

export default MainPage;
