import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import tweetsReducer from "./reducers/tweetsReducer";
import usersReducer from "./reducers/usersReducer";
import { api } from "./services/api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    tweets: tweetsReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
