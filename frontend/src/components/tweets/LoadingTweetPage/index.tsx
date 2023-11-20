import styled from "styled-components";
import VStack from "../../containers/VStack";
import LoadingTweetDetails from "./LoadingTweetDetails";
import LoadingReplyList from "../../replies/LoadingReplyList";

const ReplyTitle = styled.p`
  margin: none;
  color: ${(props) => props.theme.colors.grey1};
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: 500;
`;

const RepliesToTweet = styled(VStack)`
  background: white;
  border: 2px solid ${(props) => props.theme.colors.grey4};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top: none;
  padding: 1em;
`;

const LoadingTweetPage = () => {
  return (
    <VStack>
      <LoadingTweetDetails />

      <RepliesToTweet $gap="0.5em">
        <ReplyTitle style={{ fontWeight: "bold" }}>Replies</ReplyTitle>

        <LoadingReplyList />
      </RepliesToTweet>
    </VStack>
  );
};

export default LoadingTweetPage;
