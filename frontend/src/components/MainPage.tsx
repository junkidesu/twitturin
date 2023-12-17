import TweetList from "./tweets/TweetList";
import Box from "./containers/Box";
import { useAppSelector } from "../hooks/store";
import NewTweetForm from "./tweets/NewTweetForm";

const MainPage = () => {
  const username = useAppSelector(({ auth }) => auth?.username);

  return (
    <Box $gap="0.1em">
      {username && <NewTweetForm />}

      <TweetList />
    </Box>
  );
};

export default MainPage;
