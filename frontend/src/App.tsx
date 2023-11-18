import { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import lightTheme from "./themes/lightTheme";
import GlobalStyle from "./utils/GlobalStyle";
import Header from "./components/Header";
import TweetList from "./components/tweets/TweetList";
import Modal from "./components/containers/Modal";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./components/users/UserProfile";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import { initializeTweets } from "./reducers/tweetsReducer";
import { initializeUsers } from "./reducers/usersReducer";

const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 40%;
`;

const App = () => {
  const dispatch = useAppDispatch();
  const tweets = useAppSelector(({ tweets }) => tweets);
  const users = useAppSelector(({ users }) => users);

  useEffect(() => {
    dispatch(initializeTweets());
    dispatch(initializeUsers());
  }, [dispatch]);

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
