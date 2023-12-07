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
