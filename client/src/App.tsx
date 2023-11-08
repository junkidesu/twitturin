import { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./theme";
import Header from "./components/Header";
import { tweetData } from "./data/sample";
import TweetList from "./components/TweetList";
import { Tweet } from "./types";
import Modal from "./components/Modal";
import LoginForm from "./components/LoginForm";
import { Routes, Route } from "react-router-dom";

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
        <Routes>
          <Route path="/" element={<TweetList tweets={tweets} />} />
          <Route
            path="/login"
            element={
              <Modal>
                <LoginForm />
              </Modal>
            }
          />
        </Routes>
      </PageWrapper>
    </div>
  );
};

export default App;
