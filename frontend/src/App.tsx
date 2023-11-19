import { ThemeProvider } from "styled-components";
import lightTheme from "./themes/lightTheme";
import GlobalStyle from "./themes/GlobalStyle";
import Header from "./components/Header";
import TweetList from "./components/tweets/TweetList";
import SignUpForm from "./components/SignUpForm";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./components/users/UserProfile";
import { useGetTweetsQuery } from "./services/tweetsService";
import LoginForm from "./components/LoginForm";
import PageWrapper from "./components/PageWrapper";
import TweetPage from "./components/tweets/TweetPage";
import { useGetUsersQuery } from "./services/usersService";

const App = () => {
  const { data: tweets, isLoading } = useGetTweetsQuery();
  useGetUsersQuery();

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />

      <Header />

      <PageWrapper>
        <Routes>
          <Route
            path="/"
            element={
              isLoading || !tweets ? (
                <div>loading...</div>
              ) : (
                <TweetList tweets={tweets} />
              )
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/tweets/:id" element={<TweetPage />} />
          <Route path="/me" element={<div>current user page [TODO]</div>} />
          <Route
            path="/me/edit"
            element={<div>edit profile page [TODO]</div>}
          />
        </Routes>
      </PageWrapper>
    </ThemeProvider>
  );
};

export default App;
