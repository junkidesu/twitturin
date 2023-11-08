import { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./theme";
import Header from "./components/Header";
import { tweetData } from "./data/sample";
import TweetList from "./components/TweetList";
import { Tweet } from "./types";
import Modal from "./components/Modal";

const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 40%;
`;

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tweets, setTweets] = useState<Tweet[]>(tweetData);
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <div>
      <GlobalStyle />

      <Modal visible={visible} setVisible={setVisible}>
        this is a modal component
      </Modal>

      <Header />

      <PageWrapper>
        <TweetList tweets={tweets} />
      </PageWrapper>
    </div>
  );
};

export default App;
