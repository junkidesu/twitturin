import { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./theme";
import Header from "./components/Header";
import { tweetData } from "./data/sample";
import TweetList from "./components/tweets/TweetList";
import { Tweet } from "./types";
import Modal from "./components/containers/Modal";
import LoginForm from "./components/LoginForm";
import { Routes, Route } from "react-router-dom";

const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 40%;
`;

const LoginPage = () => (
  <Modal>
    <LoginForm />
  </Modal>
);

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={null} />
        </Routes>
      </PageWrapper>
    </div>
  );
};

export default App;
