import { TokenData } from "../types";

const AUTH_KEY = "auth";
const DOWNLOAD_KEY = "DOWNLOAD_SUGGESTED";

const setAuthUser = (tokenData: TokenData) => {
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(tokenData));
};

const getAuthUser = (): TokenData | undefined => {
  const authString = window.localStorage.getItem(AUTH_KEY);

  if (!authString) return undefined;

  return JSON.parse(authString) as TokenData;
};

const removeAuthUser = () => {
  window.localStorage.clear();
};

const getDownloadSuggested = () => {
  return window.localStorage.getItem(DOWNLOAD_KEY);
};

const setDownloadSuggested = () => {
  window.localStorage.setItem(DOWNLOAD_KEY, "true");
};

export default {
  setAuthUser,
  getAuthUser,
  removeAuthUser,
  getDownloadSuggested,
  setDownloadSuggested,
};
