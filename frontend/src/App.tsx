import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import lightTheme from "./themes/lightTheme";
import GlobalStyle from "./GlobalStyle";
import Header from "./components/Header";
import TweetList from "./components/tweets/TweetList";
import { Tweet, User } from "./types";
import Modal from "./components/containers/Modal";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./components/users/UserProfile";
import axios from "axios";

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
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const initializeTweets = async () => {
      const response = await axios.get<Tweet[]>(
        "http://localhost:3001/api/tweets"
      );

      setTweets(response.data);
    };

    const initializeUsers = async () => {
      const response = await axios.get<User[]>(
        "http://localhost:3001/api/users"
      );

      setUsers(response.data);
    };

    void initializeTweets();
    void initializeUsers();
  }, []);
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
            element={<UserProfile user={users[0]} />}
          />
        </Routes>
      </PageWrapper>
    </ThemeProvider>
  );
};

export default App;
