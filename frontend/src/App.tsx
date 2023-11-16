import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import lightTheme from "./themes/lightTheme";
import GlobalStyle from "./utils/GlobalStyle";
import Header from "./components/Header";
import TweetList from "./components/tweets/TweetList";
import { Tweet, User } from "./types";
import Modal from "./components/containers/Modal";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./components/users/UserProfile";
import usersService from "./services/usersService";
import tweetsService from "./services/tweetsService";

const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 40%;
`;

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const initializeTweets = async () => {
      const tweets = await tweetsService.getAll();

      setTweets(tweets);
    };

    const initializeUsers = async () => {
      const users = await usersService.getAll();

      setUsers(users);
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
          <Route
            path="/login"
            element={
              <Modal>
                <LoginForm />
              </Modal>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Modal>
                <SignUpForm />
              </Modal>
            }
          />
          <Route path="/users/:id" element={<UserProfile user={users[0]} />} />
        </Routes>
      </PageWrapper>
    </ThemeProvider>
  );
};

export default App;
