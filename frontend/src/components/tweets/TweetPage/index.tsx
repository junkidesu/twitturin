import { useParams } from "react-router-dom";
import styled from "styled-components";
// import ReplyList from "../../replies/ReplyList";
import TweetDetails from "./TweetDetails";
import { useGetTweetsQuery } from "../../../services/tweetsService";
import ReplyForm from "../../replies/ReplyForm";
import LoadingTweetPage from "../../util/LoadingTweetPage";
import Box from "../../containers/Box";
import BorderedBox from "../../containers/BorderedBox";
import Heading from "../../core/text/Heading";

const RepliesToTweet = styled(BorderedBox)`
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top: none;
`;

const TweetPage = () => {
  const id = useParams().id;
  const { data: tweets, isLoading, isError } = useGetTweetsQuery();

  if (isLoading) return <LoadingTweetPage />;

  if (!tweets || isError) return <div>Error occured!</div>;

  const tweet = tweets.find((t) => t.id === id);

  if (!tweet) return <div>tweet not found!</div>;

  return (
    <Box>
      <TweetDetails tweet={tweet} />

      <RepliesToTweet $pad="l" $bg="white" $gap="0.5em">
        <Heading $level={4} $mn>
          Replies
        </Heading>

        <ReplyForm id={tweet.id} parent="tweet" />
      </RepliesToTweet>
    </Box>
  );
};

export default TweetPage;
