import { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./theme";
import Header from "./components/Header";
import { tweetData } from "./data/sample";
import TweetList from "./components/TweetList";
import { Tweet } from "./types";

const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 40%;
`;

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tweets, setTweets] = useState<Tweet[]>(tweetData);

  return (
    <div>
      <GlobalStyle />

      <Header />

      <PageWrapper>
        <TweetList tweets={tweets} />
      </PageWrapper>
    </div>
  );
};

export default App;
