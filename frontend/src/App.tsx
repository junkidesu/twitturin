import { ThemeProvider } from "styled-components";
import lightTheme from "./themes/lightTheme";
import GlobalStyle from "./themes/GlobalStyle";
import Header from "./components/Header";
import SignUpForm from "./components/SignUpForm";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./components/users/UserProfile";
import LoginForm from "./components/LoginForm";
import PageWrapper from "./components/PageWrapper";
import TweetPage from "./components/tweets/TweetPage";
import { useGetUsersQuery } from "./services/usersService";
import NewTweetModal from "./components/tweets/NewTweetModal";
import MainPage from "./components/MainPage";

const App = () => {
  useGetUsersQuery();

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />

      <Header />

      <NewTweetModal />

      <PageWrapper>
        <Routes>
          <Route path="/" element={<MainPage />} />
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
