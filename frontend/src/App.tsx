import lightTheme from "./themes/lightTheme";
import GlobalStyle from "./themes/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./hooks/store";
import Header from "./components/Header";
import SignUpPage from "./views/auth/SignUpPage";
import UserPage from "./views/users/UserPage";
import LoginPage from "./views/auth/LoginPage";
import PageWrapper from "./components/containers/PageWrapper";
import TweetPage from "./views/tweets/TweetPage";
import NewTweetModal from "./components/tweets/NewTweetModal";
import MainPage from "./views/MainPage";
import LoadingStripe from "./components/util/LoadingStripe";
import NavSideBar from "./components/NavSideBar";
import SuggestedUsers from "./components/users/SuggestedUsers";
import SideBar from "./components/containers/SideBar";
import PageNotFound from "./views/util/PageNotFound";
import FollowersPage from "./views/users/FollowersPage";
import FollowingPage from "./views/users/FollowingPage";
import EditTweetPage from "./views/tweets/EditTweetPage";
import EditProfilePage from "./views/users/EditProfilePage";
import NotificationsPage from "./views/NotificationsPage";
import MessagesPage from "./views/MessagesPage";
import Footer from "./components/Footer";
import FloatingButton from "./components/core/buttons/FloatingButton";
import { icons } from "./assets";
import ErrorPage from "./views/util/ErrorPage";
import ExplorePage from "./views/ExplorePage";
import Alert from "./components/util/Alert";
import ReleasePage from "./views/ReleasePage";
import SnackBar from "./components/containers/SnackBar";
import RouterLink from "./components/core/RouterLink";
import useAuthentication from "./hooks/useAuthentication";
import useModal from "./hooks/useModal";

const RightSideBar = styled(SideBar)`
  margin-left: 50px;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const App = () => {
  const { showModal } = useModal();
  const { initializeUser } = useAuthentication();
  const id = useAppSelector(({ auth }) => auth.id);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />

      <Alert />

      <LoadingStripe />

      <Header />

      <NewTweetModal />

      <PageWrapper $horizontal $gap="0.1em">
        <NavSideBar />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/release" element={<ReleasePage />} />
          <Route
            path="/me"
            element={<Navigate to={id ? `/users/${id}` : "/login"} />}
          />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/users/:id/followers" element={<FollowersPage />} />
          <Route path="/users/:id/following" element={<FollowingPage />} />
          <Route path="/tweets/:id" element={<TweetPage />} />
          <Route path="/tweets/:id/edit" element={<EditTweetPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <RightSideBar>
          <SuggestedUsers />
        </RightSideBar>
      </PageWrapper>

      {id && (
        <FloatingButton
          icon={<icons.CreateIcon />}
          onClick={() => showModal()}
        />
      )}

      <Footer />

      <SnackBar header="Twittur is better in the app!">
        <RouterLink to="/release">Go to download page</RouterLink>
      </SnackBar>
    </ThemeProvider>
  );
};

export default App;
