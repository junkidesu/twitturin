import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import lightTheme from "./themes/lightTheme";
import GlobalStyle from "./themes/GlobalStyle";
import Header from "./components/Header";
import TweetList from "./components/tweets/TweetList";
import SignUpForm from "./components/SignUpForm";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./components/users/UserProfile";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import { initializeTweets } from "./reducers/tweetsReducer";
import { initializeUsers } from "./reducers/usersReducer";
import LoginForm from "./components/LoginForm";
import PageWrapper from "./components/PageWrapper";

const App = () => {
  const dispatch = useAppDispatch();
  const tweets = useAppSelector(({ tweets }) => tweets);

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
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/users/:id" element={<UserProfile />} />
        </Routes>
      </PageWrapper>
    </ThemeProvider>
  );
};

export default App;
