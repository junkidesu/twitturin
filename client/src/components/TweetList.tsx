import styled from "styled-components";
import { Tweet } from "../types";
import TweetItem from "./TweetItem";

const TweetListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const TweetList = ({ tweets }: { tweets: Tweet[] }) => {
  return (
    <TweetListContainer>
      {tweets.map((t) => (
        <TweetItem key={t.id} tweet={t} />
      ))}
    </TweetListContainer>
  );
};

export default TweetList;
