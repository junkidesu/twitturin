import { TokenData } from "../types";

const KEY = "auth";

const setAuthUser = (tokenData: TokenData) => {
  window.localStorage.setItem(KEY, JSON.stringify(tokenData));
};

const getAuthUser = (): TokenData | undefined => {
  const authString = window.localStorage.getItem(KEY);

  if (!authString) return undefined;

  return JSON.parse(authString) as TokenData;
};

const removeAuthUser = () => {
  window.localStorage.removeItem(KEY);
};

export default { setAuthUser, getAuthUser, removeAuthUser };
