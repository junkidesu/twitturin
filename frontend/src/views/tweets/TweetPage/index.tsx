import { useParams } from "react-router-dom";
import TweetDetails from "./TweetDetails";
import { useGetTweetQuery } from "../../../services/tweetsService";
import ReplyForm from "../../../components/replies/ReplyForm";
import LoadingTweetPage from "../../util/LoadingTweetPage";
import Box from "../../../components/containers/Box";
import BottomButtons from "./BottomButtons";
import ReplyList from "../../../components/replies/ReplyList";
import { useGetTweetRepliesQuery } from "../../../services/tweetsService";
import { Tweet } from "../../../types";
import LoadingReplyList from "../../../components/util/LoadingReplyList";
import Empty from "../../../components/util/Empty";
import ErrorPage from "../../util/ErrorPage";
import PageNotFound from "../../util/PageNotFound";
import PageHeading from "../../../components/util/PageHeading";
import Card from "../../../components/containers/Card";

const TweetReplyList = ({ tweet }: { tweet: Tweet }) => {
  const {
    data: replies,
    isLoading,
    isError,
  } = useGetTweetRepliesQuery(tweet.id);

  if (isLoading) return <LoadingReplyList />;

  if (isError) return <ErrorPage />;

  if (replies?.length === 0) return <Empty />;

  return <ReplyList replies={replies!} showChildReplies />;
};

const TweetPage = () => {
  const id = useParams().id;
  const { data: tweet, isLoading, isError } = useGetTweetQuery(id!);

  if (isLoading) return <LoadingTweetPage />;

  if (!tweet) return <PageNotFound />;

  if (isError) return <ErrorPage />;

  return (
    <Box $gap="0.1em" $width="500px">
      <TweetDetails tweet={tweet} />

      <BottomButtons tweet={tweet} />

      <PageHeading label="Replies" level={4} />

      <Card $gap="0.5em">
        <ReplyForm parentId={tweet.id} parent="tweet" id="tweet-reply-form" />
      </Card>

      <TweetReplyList tweet={tweet} />
    </Box>
  );
};

export default TweetPage;
