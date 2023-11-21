import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReplyList from "../../replies/ReplyList";
import TweetDetails from "./TweetDetails";
import { useGetTweetsQuery } from "../../../services/tweetsService";
import ReplyForm from "./ReplyForm";
import LoadingTweetPage from "../LoadingTweetPage";
import Box from "../../containers/Box";
import BorderedBox from "../../containers/BorderedBox";

const ReplyTitle = styled.p`
  margin: none;
  color: ${(props) => props.theme.colors.grey1};
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: 500;
`;

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
        <ReplyTitle style={{ fontWeight: "bold" }}>Replies</ReplyTitle>

        <ReplyForm id={tweet.id} />

        <ReplyList replies={tweet.replies} />
      </RepliesToTweet>
    </Box>
  );
};

export default TweetPage;
