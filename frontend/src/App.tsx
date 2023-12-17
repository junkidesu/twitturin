import lightTheme from "./themes/lightTheme";
import GlobalStyle from "./themes/GlobalStyle";
import storageService from "./services/storageService";
import styled, { ThemeProvider } from "styled-components";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import { setCredentials } from "./reducers/authReducer";
import Header from "./components/Header";
import SignUpPage from "./components/auth/SignUpPage";
import UserPage from "./components/users/UserPage";
import LoginPage from "./components/auth/LoginPage";
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
import EditTweetPage from "./components/tweets/EditTweetPage";
import LoginSuggestion from "./components/util/LoginSuggestion";
import EditProfilePage from "./components/users/EditProfilePage";
import NotificationsPage from "./components/NotificationsPage";
import MessagesPage from "./components/MessagesPage";

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
        {username ? (
          <NavSideBar />
        ) : (
          <SideBar>
            <LoginSuggestion />
          </SideBar>
        )}

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/explore" element={<ComingSoon />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/users/:id/followers" element={<FollowersPage />} />
          <Route path="/users/:id/following" element={<FollowingPage />} />
          <Route path="/tweets/:id" element={<TweetPage />} />
          <Route path="/tweets/:id/edit" element={<EditTweetPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <RightSideBar>
          <SuggestedUsers />
        </RightSideBar>
      </PageWrapper>
    </ThemeProvider>
  );
};

export default App;
