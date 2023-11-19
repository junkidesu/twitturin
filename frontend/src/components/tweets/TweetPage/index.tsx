import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import VerticalList from "../../lists/VerticalList";
import ReplyList from "../../replies/ReplyList";
import ReplyModal from "./ReplyModal";
import TweetDetails from "./TweetDetails";
import { useGetTweetsQuery } from "../../../services/tweetsService";

const ReplyTitle = styled.p`
  margin: none;
  color: ${(props) => props.theme.colors.grey1};
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: 500;
`;

const RepliesToTweet = styled(VerticalList)`
  background: white;
  border: 2px solid ${(props) => props.theme.colors.grey4};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top: none;
  padding: 1em;
`;

const TweetPage = () => {
  const id = useParams().id;
  const { data: tweets, isLoading, isError } = useGetTweetsQuery();
  const [visible, setVisible] = useState(false);

  if (isLoading) return <div>loading...</div>;

  if (!tweets || isError) return <div>Error occured!</div>;

  const tweet = tweets.find((t) => t.id === id);

  if (!tweet) return <div>tweet not found!</div>;

  return (
    <VerticalList>
      <ReplyModal tweet={tweet} visible={visible} setVisible={setVisible} />

      <TweetDetails tweet={tweet} setVisible={setVisible} />

      <RepliesToTweet $gap="0.5em">
        <ReplyTitle style={{ fontWeight: "bold" }}>Replies</ReplyTitle>

        <ReplyList replies={tweet.replies} />
      </RepliesToTweet>
    </VerticalList>
  );
};

export default TweetPage;
