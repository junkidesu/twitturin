import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import tweetsReducer from "./reducers/tweetsReducer";
import usersReducer from "./reducers/usersReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tweets: tweetsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
