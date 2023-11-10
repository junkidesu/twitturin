import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import lightTheme from "./themes/lightTheme";
import GlobalStyle from "./GlobalStyle";
import Header from "./components/Header";
import { tweetData, userData } from "./data/sample";
import TweetList from "./components/tweets/TweetList";
import { Tweet } from "./types";
import Modal from "./components/containers/Modal";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./components/users/UserProfile";

const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 40%;
`;

const LoginPage = () => (
  <Modal>
    <LoginForm />
  </Modal>
);

const SignUpPage = () => (
  <Modal>
    <SignUpForm />
  </Modal>
);

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tweets, setTweets] = useState<Tweet[]>(tweetData);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />

      <Header />

      <PageWrapper>
        <Routes>
          <Route path="/" element={<TweetList tweets={tweets} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route
            path="/users/:id"
            element={<UserProfile user={userData[1]} />}
          />
        </Routes>
      </PageWrapper>
    </ThemeProvider>
  );
};

export default App;
