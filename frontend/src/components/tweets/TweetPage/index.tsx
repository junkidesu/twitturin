import { useParams } from "react-router-dom";
import TweetDetails from "./TweetDetails";
import { useGetTweetQuery } from "../../../services/tweetsService";
import ReplyForm from "../../replies/ReplyForm";
import LoadingTweetPage from "../../util/LoadingTweetPage";
import Box from "../../containers/Box";
import Heading from "../../core/text/Heading";
import BottomButtons from "./BottomButtons";
import ReplyList from "../../replies/ReplyList";
import { useGetTweetRepliesQuery } from "../../../services/repliesService";
import { Tweet } from "../../../types";
import LoadingReplyList from "../../util/LoadingReplyList";

const TweetReplyList = ({ tweet }: { tweet: Tweet }) => {
  const { data: replies, isLoading } = useGetTweetRepliesQuery(tweet.id);

  if (isLoading) return <LoadingReplyList />;

  return <ReplyList replies={replies!} showChildReplies />;
};

const TweetPage = () => {
  const id = useParams().id;
  const { data: tweet, isLoading, isError } = useGetTweetQuery(id!);

  if (isLoading) return <LoadingTweetPage />;

  if (isError) return <div>Error occured!</div>;

  if (!tweet) return <div>tweet not found!</div>;

  return (
    <Box $gap="0.1em" $width="500px">
      <TweetDetails tweet={tweet} />

      <BottomButtons tweet={tweet} />

      <Box $bg="white" $pad="l">
        <Heading $level={4}>Replies</Heading>
      </Box>

      <Box $pad="l" $bg="white" $gap="0.5em" $width="100%">
        <ReplyForm id={tweet.id} parent="tweet" />
      </Box>

      <TweetReplyList tweet={tweet} />
    </Box>
  );
};

export default TweetPage;
