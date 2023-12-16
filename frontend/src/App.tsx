import lightTheme from "./themes/lightTheme";
import GlobalStyle from "./themes/GlobalStyle";
import storageService from "./services/storageService";
import styled, { ThemeProvider } from "styled-components";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import { setCredentials } from "./reducers/authReducer";
import Header from "./components/Header";
import SignUpForm from "./components/auth/SignUpForm";
import UserPage from "./components/users/UserPage";
import LoginForm from "./components/auth/LoginForm";
import PageWrapper from "./components/util/PageWrapper";
import TweetPage from "./components/tweets/TweetPage";
import NewTweetModal from "./components/tweets/NewTweetModal";
import MainPage from "./components/MainPage";
import LoadingStripe from "./components/util/LoadingStripe";
import NavSideBar from "./components/NavSideBar";
import SuggestedUsers from "./components/users/SuggestedUsers";
import SideBar from "./components/containers/SideBar";
import ComingSoon from "./components/util/ComingSoon";
import PageNotFound from "./components/util/PageNotFound";
import FollowersPage from "./components/users/FollowersPage";
import FollowingPage from "./components/users/FollowingPage";

const RightSideBar = styled(SideBar)`
  margin-left: 50px;
`;

const App = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(({ auth }) => auth?.username);

  useEffect(() => {
    const tokenData = storageService.getAuthUser();

    if (tokenData) dispatch(setCredentials(tokenData));
  }, [dispatch]);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />

      <LoadingStripe />

      <Header />

      <NewTweetModal />

      <PageWrapper $horizontal $gap="0.1em">
        {username && <NavSideBar />}

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/explore" element={<ComingSoon />} />
          <Route path="/messages" element={<ComingSoon />} />
          <Route path="/notifications" element={<ComingSoon />} />
          <Route path="/communities" element={<ComingSoon />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/users/:id/followers" element={<FollowersPage />} />
          <Route path="/users/:id/following" element={<FollowingPage />} />
          <Route path="/tweets/:id" element={<TweetPage />} />
          <Route path="/me" element={<ComingSoon />} />
          <Route path="/me/edit" element={<ComingSoon />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        {username && (
          <RightSideBar>
            <SuggestedUsers />
          </RightSideBar>
        )}
      </PageWrapper>
    </ThemeProvider>
  );
};

export default App;
