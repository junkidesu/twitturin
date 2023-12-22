import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import modalReducer from "./reducers/modalReducer";
import { api } from "./services/api";
import loadingStripeReducer from "./reducers/loadingStripeReducer";
import alertReducer from "./reducers/alertReducer";
import { githubApi } from "./services/githubService";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [githubApi.reducerPath]: githubApi.reducer,
    auth: authReducer,
    modal: modalReducer,
    loading: loadingStripeReducer,
    alert: alertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
