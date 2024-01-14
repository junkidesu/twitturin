import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import store from "../store";
import lightTheme from "../themes/lightTheme";
import { Major, Tweet, User } from "../types";

export const renderWithProviders = (ui: React.ReactElement) => {
  const Wrapper = () => {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
        </Provider>
      </BrowserRouter>
    );
  };

  return render(ui, { wrapper: Wrapper });
};

export const initialUsers: User[] = [
  {
    subject: "Mechanical Engineering",
    username: "albero03",
    fullName: "Albero Rossi",
    birthday: "1975-11-17",
    bio: "I am a teacher of mechanical engineering in Politecnico Di Torino. In my free time, I like to play tennis.",
    country: "Italy",
    kind: "teacher",
    followingCount: 1,
    followersCount: 1,
    age: 48,
    id: "657ebfc0a49f7f3984586061",
  },
  {
    major: "SE" as Major,
    studentId: "se12345",
    username: "student1",
    birthday: "2001-09-30",
    country: "Uzbekistan",
    kind: "student",
    followingCount: 0,
    followersCount: 0,
    age: 22,
    id: "65829311f7ce0044179273f5",
  },
];

export const initialTweets: Tweet[] = [
  {
    content: "teaching ME is fun!",
    author: initialUsers[0],
    likedBy: [initialUsers[1].id],
    createdAt: "2024-01-11T19:36:36.706Z",
    updatedAt: "2024-01-11T19:36:36.706Z",
    likes: 1,
    replyCount: 0,
    id: "65a043445c8428d4f2022473",
  },
  {
    content: "I like studying stuff!",
    author: initialUsers[1],
    likedBy: [initialUsers[0].id],
    createdAt: "2024-01-11T19:30:52.341Z",
    updatedAt: "2024-01-11T19:30:52.341Z",
    likes: 1,
    replyCount: 0,
    id: "65a041ec5c8428d4f202244e",
  },
];
