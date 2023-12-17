import TweetList from "./tweets/TweetList";
import Box from "./containers/Box";
import { useAppSelector } from "../hooks/store";
import NewTweetForm from "./tweets/NewTweetForm";
import { useGetTweetsQuery } from "../services/tweetsService";
import LoadingTweetList from "./util/LoadingTweetList";
import ErrorPage from "./util/ErrorPage";
import styled from "styled-components";

const StyledTweetForm = styled(NewTweetForm)`
  @media (max-width: 650px) {
    display: none;
  }
`;

const MainPage = () => {
  const username = useAppSelector(({ auth }) => auth?.username);
  const { data: tweets, isLoading, isError } = useGetTweetsQuery(undefined);

  if (isError) return <ErrorPage />;

  return (
    <Box $gap="0.1em" $width="500px">
      {username && !isLoading && <StyledTweetForm />}

      {isLoading ? <LoadingTweetList /> : <TweetList tweets={tweets!} />}
    </Box>
  );
};

export default MainPage;
