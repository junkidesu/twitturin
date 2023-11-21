import { ThemeProvider } from "styled-components";
import { useEffect } from "react";
import lightTheme from "./themes/lightTheme";
import GlobalStyle from "./themes/GlobalStyle";
import Header from "./components/Header";
import SignUpForm from "./components/auth/SignUpForm";
import { Routes, Route } from "react-router-dom";
import UserPage from "./components/users/UserPage";
import LoginForm from "./components/auth/LoginForm";
import PageWrapper from "./components/util/PageWrapper";
import TweetPage from "./components/tweets/TweetPage";
import { useGetUsersQuery } from "./services/usersService";
import NewTweetModal from "./components/tweets/NewTweetModal";
import MainPage from "./components/MainPage";
import storageService from "./services/storageService";
import { useAppDispatch } from "./hooks/store";
import { setCredentials } from "./reducers/authReducer";

const App = () => {
  useGetUsersQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const tokenData = storageService.getAuthUser();

    if (tokenData) dispatch(setCredentials(tokenData));
  }, [dispatch]);

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
          <Route path="/users/:id" element={<UserPage />} />
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
