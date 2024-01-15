import { removeCredentials, setCredentials } from "../reducers/authReducer";
import { useLoginMutation } from "../services/authService";
import storageService from "../services/storageService";
import { Credentials } from "../types";
import { useAppDispatch } from "./store";

const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const authenticate = async (creds: Credentials) => {
    const tokenData = await login(creds).unwrap();

    storageService.setAuthUser(tokenData);
    dispatch(setCredentials(tokenData));
  };

  const initializeUser = () => {
    const tokenData = storageService.getAuthUser();

    if (tokenData) {
      dispatch(setCredentials(tokenData));
    }
  };

  const logout = () => {
    storageService.getAuthUser();
    dispatch(removeCredentials());
  };

  return { initializeUser, authenticate, logout, isLoading };
};

export default useAuthentication;
