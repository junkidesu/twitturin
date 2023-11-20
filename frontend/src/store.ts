import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import usersReducer from "./reducers/usersReducer";
import modalReducer from "./reducers/modalReducer";
import { api } from "./services/api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    users: usersReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
